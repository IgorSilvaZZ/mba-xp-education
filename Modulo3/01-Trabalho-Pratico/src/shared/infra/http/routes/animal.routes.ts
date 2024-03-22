import { Router } from "express";

import { animalController } from "../../../factories/animal.factory";

const animalRouter = Router();

animalRouter.get("/", (req, res) => {
  return animalController.get(req, res);
});

animalRouter.get("/:proprietarioId", (req, res) => {
  return animalController.getByProprietarioId(req, res);
});

animalRouter.get("/:animalId", (req, res) => {
  return animalController.getById(req, res);
});

animalRouter.post("/", (req, res) => {
  return animalController.create(req, res);
});

animalRouter.put("/:animalId", (req, res) => {
  return animalController.update(req, res);
});

animalRouter.delete("/:animalId", (req, res) => {
  return animalController.delete(req, res);
});

export { animalRouter };
