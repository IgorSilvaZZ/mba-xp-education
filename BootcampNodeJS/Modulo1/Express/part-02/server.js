import express from "express";
import winston from "winston";

import { carsRouters } from "./carrosRoutes";

const app = express();

app.use(express.json());

const { combine, printf, label, timestamp } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-app" }), timestamp(), myFormat),
});

app.use(express.static("public"));
app.use("/images", express.static("public"));

app.use("/cars", carsRouters);

app.use((error, req, res, next) => {
  logger.error()("Error 1");

  next();
});

app.use((error, req, res, next) => {
  logger.error()("Error 2");

  res.status(500).send("Ocorreu um erro, tente novamente mais tarde!");
});

app.listen(3333, () => console.log("Server is Running"));
