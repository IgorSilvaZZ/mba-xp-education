import { Router } from "express";

import {
  createAccount,
  deleteAccount,
  getAccount,
  getAccounts,
  updateAccount,
  updateBalanceAccount,
} from "../controllers/account.controller.js";

const accountRouter = Router();

accountRouter.post("/", createAccount);
accountRouter.get("/", getAccounts);
accountRouter.get("/:id", getAccount);
accountRouter.delete("/:id", deleteAccount);
accountRouter.put("/:id", updateAccount);
accountRouter.patch("/updateBalance/:id", updateBalanceAccount);

accountRouter.use((error, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);

  res.status(400).send({ message: error });
});

export { accountRouter };
