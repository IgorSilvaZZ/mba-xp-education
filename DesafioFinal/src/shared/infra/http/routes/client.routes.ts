import { Router } from "express";
import { clientController } from "../../../factories/client.factory";

const clientRouter = Router();

clientRouter.get("/", (req, res) => {
  return clientController.get(req, res);
});

clientRouter.post("/", (req, res) => {
  return clientController.create(req, res);
});

export { clientRouter };
