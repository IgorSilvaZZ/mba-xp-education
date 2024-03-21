import { Router } from "express";

import { ClientController } from "../controller/client.controller.js";

const clientController = new ClientController();

const clientRouter = Router();

clientRouter.get("/", (req, res, next) => {
  return clientController.get(req, res, next);
});

clientRouter.get("/:id", (req, res, next) => {
  return clientController.getById(req, res, next);
});

clientRouter.post("/", (req, res, next) => {
  return clientController.create(req, res, next);
});

clientRouter.put("/:id", (req, res, next) => {
  return clientController.update(req, res, next);
});

clientRouter.delete("/:id", (req, res, next) => {
  return clientController.delete(req, res, next);
});

export { clientRouter };
