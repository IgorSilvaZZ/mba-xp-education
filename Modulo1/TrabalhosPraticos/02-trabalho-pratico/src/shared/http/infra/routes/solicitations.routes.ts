import { Router } from "express";
import { solicitationController } from "../../../../solicitations/factories/Solicitation.factory";

const solicitationsRouter = Router();

solicitationsRouter.post("/", async (req, res) => {
  return await solicitationController.post(req, res);
});

solicitationsRouter.get("/", async (req, res) => {
  return await solicitationController.get(req, res);
});

export { solicitationsRouter };
