import { Router } from "express";

import { ProductController } from "../controller/product.controller.js";

const productController = new ProductController();

const productRouter = Router();

productRouter.get("/", (req, res, next) => {
  return productController.get(req, res, next);
});

productRouter.get("/info", (req, res, next) => {
  return productController.getProductsInfo(req, res, next);
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

productRouter.post("/info", (req, res, next) => {
  return productController.createProductInfo(req, res, next);
});

productRouter.put("/info/:productId", (req, res, next) => {
  return productController.updateProductInfo(req, res, next);
});

productRouter.delete("/info/:productId", (req, res, next) => {
  return productController.deleteProductInfo(req, res, next);
});

productRouter.post("/info/review/:productId", (req, res, next) => {
  return productController.createReviewProductInfo(req, res, next);
});

productRouter.delete(
  "/info/review/:productId/:indexReview",
  (req, res, next) => {
    return productController.deleteReviewProductInfo(req, res, next);
  }
);

export { productRouter };
