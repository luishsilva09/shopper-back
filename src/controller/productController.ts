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
}
