import { Request, Response } from "express";
import csv from "csvtojson";
import * as productRepository from "../repositories/productRepository";
import connection from "../database/mysql";
import fs from "fs";
import path from "path";
import { db } from "../database/db";

export async function validateFile(req: Request, res: Response) {
  const file = req.file;
  if (!file) return res.send("faltando arquivo").status(404);

  let result: Array<object> = [];

  result = await missElement(file);
  result = await existProduct(result);
  result = await costPriceNewPrice(result);
  result = await validNewPrice(result);
  //   result = await packPrice(result);
  res.send(result);
}

//verificar se falta algum campo
async function missElement(file: Express.Multer.File) {
  const fileData: Array<object> = await csv().fromString(
    file.buffer.toString()
  );
  const result: Array<object> = [];

  fileData.forEach((element: any) => {
    if (
      !element.hasOwnProperty("product_code") ||
      !element.hasOwnProperty("new_price")
    ) {
      result.push({ ...element, invalidElement: "Campos incorretos" });
    }

    // verificar se possui todos os dados e sao validos
    if (
      !element.product_code ||
      !element.new_price ||
      isNaN(element.product_code) ||
      isNaN(element.new_price) ||
      element.new_price < 0 ||
      element.product_code < 0
    ) {
      result.push({ ...element, invalidElement: "Campos incorretos" });
    } else {
      result.push({ ...element, invalidElement: "Dados OK" });
    }
  });
  return result;
}
//verifique se o codigo do produto existe
async function existProduct(file: any) {
  let result: Array<object> = [];

  for (let i = 0; i < file.length; i++) {
    const data = await db.products.findUnique({
      where: { code: Number(file[i]?.product_code) || 0 },
    });
    if (data == null) {
      result.push({ ...file[i], data: "dados não existe" });
    } else {
      result.push({
        ...file[i],
        data: { ...data, code: Number(data?.code) },
      });
    }
  }
  return result;
}
//Vereficar novo preco e preço de custo
async function costPriceNewPrice(file: any) {
  const result: object[] = [];
  file.forEach((e: any) => {
    if (typeof e.data == "string" || e.invalidElement !== "Dados OK") {
      result.push({ ...e, cost: "Dados invalido" });
      return;
    }
    if (Number(e.new_price) < e.data.cost_price) {
      result.push({ ...e, cost: "Novo preco menor que custo" });
      return;
    } else {
      result.push({ ...e, cost: "Dados OK" });
    }
  });
  return result;
}
//verificar os 10%
async function validNewPrice(file: any) {
  const result: object[] = [];
  file.forEach((e: any) => {
    if (typeof e.data == "string" || e.invalidElement !== "Dados OK") {
      result.push({ ...e, novoPreco: "Dados invalido" });
      return;
    }
    const MAXPRICE = e.data.sales_price + (e.data.sales_price * 10) / 100;
    const MINPRICE = e.data.sales_price - (e.data.sales_price * 10) / 100;

    if (e.new_price < MINPRICE) {
      result.push({ ...e, novoPreco: "Menor que 10%" });
    } else if (e.new_price < MAXPRICE) {
      result.push({ ...e, novoPreco: "Maior que 10%" });
    } else {
      result.push({ ...e, novoPreco: "Dados OK" });
    }
  });

  return result;
}
}
