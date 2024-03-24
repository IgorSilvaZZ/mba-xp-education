import { Router } from "express";

import { SaleController } from "../controller/sale.controller.js";

const saleRouter = Router();

const saleController = new SaleController();

saleRouter.get("/", (req, res, next) => {
  return saleController.get(req, res, next);
});

saleRouter.get("/:id", (req, res, next) => {
  return saleController.getById(req, res, next);
});

saleRouter.post("/", (req, res, next) => {
  return saleController.create(req, res, next);
});

saleRouter.put("/:id", (req, res, next) => {
  return saleController.update(req, res, next);
});

saleRouter.delete("/:id", (req, res, next) => {
  return saleController.delete(req, res, next);
});

export { saleRouter };
