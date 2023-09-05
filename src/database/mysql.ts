import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

export default connection;
