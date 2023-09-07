import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
const prisma = new PrismaClient();

async function main() {
  const query = fs
    .readFileSync(path.join(__dirname, "./seed.sql"))
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
    .replace(/\s+/g, " ")
    .split(";")
    .filter(function (el) {
      return el.length != 0;
    }); // remove any empty ones

  for (let i = 0; i < query.length; i++) {
    await prisma.$queryRawUnsafe(`${query[i]}`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
