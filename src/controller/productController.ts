import { Request, Response } from "express";
import csv from "csvtojson";
import connection from "../database/mysql";
import fs from "fs";
import path from "path";

  const file = req.file;
  if (!file) throw "erro";

  const fullData = await csv().fromString(file.buffer.toString());

  console.log(fullData);
  res.send("OK");
}
