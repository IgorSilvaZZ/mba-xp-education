import express from "express";
import cors from "cors";
import winston, { format } from "winston";

import { clientRouter } from "./routes/client.route";
import { productRouter } from "./routes/product.route";
import { supplierRouter } from "./routes/supplier.route";
import { saleRouter } from "./routes/sale.route";

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "store-api.log" }),
  ],
  format: format.combine(
    format.label({ label: "store-api" }),
    format.timestamp(),
    myFormat
  ),
});

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use("/client", clientRouter);
app.use("/product", productRouter);
app.use("/supplier", supplierRouter);
app.use("/sale", saleRouter);

app.listen(3333, () => console.log("Api Started"));
