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
}
