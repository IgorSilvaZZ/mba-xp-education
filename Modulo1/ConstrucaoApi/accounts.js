import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

const accountRouter = Router();

accountRouter.post("/", async (req, res) => {
  const { name, balance } = req.body;

  if (!name || balance === null) {
    throw new Error("Field name and balance is required");
  }

  let account = {
    name,
    balance,
  };

  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    account = {
      id: data.nextId++,
      ...account,
    };

    data.accounts.push(account);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(`POST /account - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

accountRouter.get("/", async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    delete data.nextId;

    global.logger.info(`GET /account`);

    return res.json(data);
  } catch (error) {
    next(error);
  }
});

accountRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    const account = data.accounts.find((item) => item.id === Number(id));

    global.logger.info(`GET /account/:id - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    next(error);
  }
});

accountRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    data.accounts = data.accounts.filter((item) => item.id !== Number(id));

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(`DELETE /account/:id - ${id}`);

    return res.end();
  } catch (error) {
    next(error);
  }
});

accountRouter.put("/:id", async (req, res) => {
  const { name, balance } = req.body;
  const { id } = req.params;

  if (!name || balance === null) {
    throw new Error("Field name and balance is invalid");
  }

  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    let accountIndex = data.accounts.findIndex(
      (item) => item.id === Number(id)
    );

    if (accountIndex === -1) {
      throw new Error("Account not exists!");
    }

    const account = {
      ...data.accounts[accountIndex],
      name,
      balance,
    };

    data.accounts[accountIndex] = account;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(`PUT /account/:id - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    next(error);
  }
});

accountRouter.patch("/updateBalance/:id", async (req, res, next) => {
  const { balance } = req.body;
  const { id } = req.params;

  if (balance === null) {
    throw new Error("Field balance is invalid!");
  }

  try {
    const data = JSON.parse(await readFile(global.fileName, "utf-8"));

    let accountIndex = data.accounts.findIndex(
      (item) => item.id === Number(id)
    );

    if (accountIndex === -1) {
      throw new Error("Account not exits!");
    }

    const account = {
      ...data.accounts[accountIndex],
      balance,
    };

    data.accounts[accountIndex] = account;

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    global.logger.info(
      `PATCH /account/updateBalance/:id - ${JSON.stringify(account)}`
    );

    return res.json(account);
  } catch (error) {
    next(error);
  }
});

accountRouter.use((error, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${error.message}`);

  res.status(400).send({ message: error });
});

export { accountRouter };
