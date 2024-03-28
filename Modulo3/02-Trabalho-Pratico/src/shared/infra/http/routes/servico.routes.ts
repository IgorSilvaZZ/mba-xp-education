import { Router } from "express";

import { servicoController } from "../../../factories/servico.factory";

const servicoRouter = Router();

servicoRouter.get("/", (req, res) => {
  return servicoController.get(req, res);
});

servicoRouter.get("/:proprietarioId", (req, res) => {
  return servicoController.getByProprietarioId(req, res);
});

servicoRouter.post("/", (req, res) => {
  return servicoController.create(req, res);
});

export { servicoRouter };
