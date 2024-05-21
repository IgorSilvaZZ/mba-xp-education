import express from "express";
import cors from "cors";
import winston, { format } from "winston";
import { readFile, writeFile } from "fs/promises";

import { accountRouter } from "./accounts.js";

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = "accounts.json";

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: format.combine(
    format.label({ label: "my-bank-api" }),
    format.timestamp(),
    myFormat
  ),
});

const app = express();

app.use(express.json());
app.use("/account", accountRouter);

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3333, async () => {
  try {
    await readFile(global.fileName);

    global.logger.info("My Bank Api is Running!");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    try {
      await writeFile(global.fileName, JSON.stringify(initialJson, null, 2));

      global.logger.info("My Bank Api is Running!");
    } catch (error) {
      global.logger.error(error);
    }
  }
});
