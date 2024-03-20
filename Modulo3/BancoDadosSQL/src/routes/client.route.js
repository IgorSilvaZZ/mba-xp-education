import { Router } from "express";

import { ClientController } from '../controller/client.controller.js';

const clientController = new ClientController();

const clientRouter = Router();

clientRouter.post('/', clientController.create);

export { clientRouter };
