import { Router } from "express";
import CreateUserFactoryFactory from "../../../../solicitations/factories/CreateUserFactory.factory";

const solicitationsRouter = Router();

const createSolicitationController = CreateUserFactoryFactory();

solicitationsRouter.post("/", createSolicitationController.create);

export { solicitationsRouter };
