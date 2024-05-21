import { Router } from "express";

import { SupplierController } from "../controller/supplier.controller.js";

const supplierRouter = Router();

const supplierController = new SupplierController();

supplierRouter.get("/", (req, res, next) => {
  return supplierController.get(req, res, next);
});

supplierRouter.get("/:id", (req, res, next) => {
  return supplierController.getById(req, res, next);
});

supplierRouter.post("/", (req, res, next) => {
  return supplierController.create(req, res, next);
});

supplierRouter.put("/:id", (req, res, next) => {
  return supplierController.update(req, res, next);
});

supplierRouter.delete("/:id", (req, res, next) => {
  return supplierController.delete(req, res, next);
});

export { supplierRouter };
