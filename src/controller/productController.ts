import { Request, Response } from "express";
import csv from "csvtojson";

export async function readFile(req: Request, res: Response) {
  const file = req.file;
  if (!file) throw "erro";

  const fullData = await csv().fromString(file.buffer.toString());

  console.log(fullData);
  res.send("OK");
}
