import { Request, Response } from "express";
import csv from "csvtojson";
import connection from "../database/mysql";
import fs from "fs";
import path from "path";

export async function readFile(req: Request, res: Response) {
//criar e popular banco de dados
export async function seederDB(req: Request, res: Response) {
  const query = fs
    .readFileSync(path.join(__dirname, "../database/database.sql"))
    .toString()
    .trim()
    .split(";");

  query.forEach((e) => {
    if (!e) return;
    connection.query(e, (err, rows, fields) => {
      if (err) throw err.sqlMessage;
      console.log("Criado");
    });
  });

  res.send(query);
}
  const file = req.file;
  if (!file) throw "erro";

  const fullData = await csv().fromString(file.buffer.toString());

  console.log(fullData);
  res.send("OK");
}
