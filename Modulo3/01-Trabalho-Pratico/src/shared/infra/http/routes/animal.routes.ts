import { Router } from "express";

import { animalController } from "../../../factories/animal.factory";

const animalRouter = Router();

animalRouter.get("/", (req, res) => {
  return animalController.get(req, res);
});

animalRouter.post("/", (req, res) => {
  return animalController.create(req, res);
});

animalRouter.put("/:animalId", (req, res) => {
  return animalController.update(req, res);
});

export { animalRouter };
