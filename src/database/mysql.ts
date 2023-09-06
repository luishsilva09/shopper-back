import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT ?? "3306"),
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});
export default connection;
