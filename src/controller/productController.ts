import { Request, Response } from "express";
import csv from "csvtojson";
import { db } from "../database/db";

export async function validateFile(req: Request, res: Response) {
  const file = req.file;
  if (!file) return res.send("faltando arquivo").status(404);

  let result: Array<object> = [];

  result = await missElement(file);
  result = await existProduct(result);
  result = await costPriceNewPrice(result);
  result = await validNewPrice(result);
  // await packPrice(result);
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
    const MAXPRICE =
      Number(e.data.sales_price) + (Number(e.data.sales_price) * 10) / 100;
    const MINPRICE =
      Number(e.data.sales_price) - (Number(e.data.sales_price) * 10) / 100;
    if (Number(e.new_price) < MINPRICE) {
      result.push({ ...e, novoPreco: "Menor que 10%" });
    } else if (Number(e.new_price) > MAXPRICE) {
      result.push({ ...e, novoPreco: "Maior que 10%" });
    } else {
      result.push({ ...e, novoPreco: "Dados OK" });
    }
  });
  return result;
}
//validacao de preco por pack
async function packPrice(file: any) {
  const result: any = [];
  const packs: Array<any> = [];
  const productHash = new Map();

  for (let i = 0; i < file.length; i++) {
    if (typeof file[i].data != "string") {
      productHash.set(file[i].data.code, { ...file[i] });
    }
    //verifica se é um pack e traz os dados
    const packInfo = await db.packs.findMany({
      where: { pack_id: Number(file[i]?.product_code) || 0 },
      include: { products: true },
    });
    if (packInfo[0] != null) {
      packInfo.forEach((e) => {
        packs.push(e);
        console.log(e);
      });
    }
  }
  //verifica se o produto do pack esta na lista
  packs.forEach((e) => {
    const productData = productHash.get(Number(e.products.code));
    const packData = productHash.get(Number(e.pack_id));
    if (productData) {
      // console.log(productData);
      // console.log(packData);
      // console.log(e);

      //verifica valor do pack com valor individual
      if (
        Number(productData.new_price) * Number(e.qty) ==
        Number(packData.new_price)
      ) {
        console.log("Tudo certo");
        result.push(productData, { ...packData, packInfo: "OK" });
      } else {
        console.log("verifique os dados");
      }
    }
  });
}
//fazer o update no banco de dados como os novos dados
export async function update(req: Request, res: Response) {
  const data = req.body;

  for (let i = 0; i < data.length; i++) {
    await db.products.update({
      where: { code: data[i].data.code },
      data: { sales_price: Number(data[i].new_price) },
    });
  }
  res.send("OK");
}
