import express from "express";
import cors from "cors";
import winston, { format } from "winston";

import { clientRouter } from "./routes/client.route.js";
import { productRouter } from "./routes/product.route.js";
import { supplierRouter } from "./routes/supplier.route.js";
import { saleRouter } from "./routes/sale.route.js";

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
app.use("/supplier", supplierRouter);
app.use("/product", productRouter);
app.use("/sale", saleRouter);

app.use((error, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);

  res.status(400).json({ error: error.message });
});

app.listen(3333, () => console.log("Api Started"));
