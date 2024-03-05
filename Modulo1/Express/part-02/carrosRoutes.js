import { Router } from "express";

const carsRouters = Router();

carsRouters.get("/", (req, res) => {
  res.send("/cars");
});

carsRouters.get("/prices", (req, res) => {
  res.send("/cars/prices");
});

carsRouters.get("/testError", (req, res) => {
  throw new Error("Error message test!");
});

carsRouters.post("/", async (req, res, next) => {
  try {
    throw new Error("Error message async");
  } catch (error) {
    next(error);
  }
});

export { carsRouters };
