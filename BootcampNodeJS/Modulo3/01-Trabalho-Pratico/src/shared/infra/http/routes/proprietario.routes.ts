import { Router } from "express";

import { proprietarioController } from "../../../factories/proprietarios.factory";

const proprietarioRouter = Router();

proprietarioRouter.get("/", (req, res) => {
  return proprietarioController.get(req, res);
});

proprietarioRouter.get("/:proprietarioId", (req, res) => {
  return proprietarioController.getById(req, res);
});

proprietarioRouter.post("/", (req, res) => {
  return proprietarioController.create(req, res);
});

proprietarioRouter.put("/:proprietarioId", (req, res) => {
  return proprietarioController.update(req, res);
});

proprietarioRouter.delete("/:proprietarioId", (req, res) => {
  return proprietarioController.delete(req, res);
});

export { proprietarioRouter };
