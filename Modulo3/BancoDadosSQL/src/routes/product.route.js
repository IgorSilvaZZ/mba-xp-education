import { Router } from "express";

import { ProductController } from "../controller/product.controller.js";

const productController = new ProductController();

const productRouter = Router();

productRouter.get("/", (req, res, next) => {
  return productController.get(req, res, next);
});

productRouter.get("/:id", (req, res, next) => {
  return productController.getById(req, res, next);
});

productRouter.post("/", (req, res, next) => {
  return productController.create(req, res, next);
});

productRouter.put("/:id", (req, res, next) => {
  return productController.update(req, res, next);
});

productRouter.delete("/:id", (req, res, next) => {
  return productController.delete(req, res, next);
});

export { productRouter };
