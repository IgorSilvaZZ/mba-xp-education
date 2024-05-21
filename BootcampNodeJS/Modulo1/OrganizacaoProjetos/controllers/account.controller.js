import {
  deleteAccountById,
  listAccountById,
  listAccounts,
  newAccount,
  updateAccountById,
  updateBalanceAccountById,
} from "../services/account.service.js";

export async function getAccounts(req, res, next) {
  try {
    const accounts = await listAccounts();

    global.logger.info(`GET /account`);

    return res.json(accounts);
  } catch (error) {
    next(error);
  }
}

export async function getAccount(req, res, next) {
  const { id } = req.params;

  try {
    const account = await listAccountById(id);

    global.logger.info(`GET /account/:id - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function createAccount(req, res) {
  const { name, balance } = req.body;

  try {
    const account = await newAccount({ name, balance });

    global.logger.info(`POST /account - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deleteAccount(req, res, next) {
  const { id } = req.params;

  try {
    await deleteAccountById(id);

    global.logger.info(`DELETE /account/:id - ${id}`);

    return res.end();
  } catch (error) {
    next(error);
  }
}

export async function updateAccount(req, res, next) {
  const { name, balance } = req.body;
  const { id } = req.params;

  try {
    const account = await updateAccountById(id, { name, balance });

    global.logger.info(`PUT /account/:id - ${JSON.stringify(account)}`);

    return res.json(account);
  } catch (error) {
    next(error);
  }
}

export async function updateBalanceAccount(req, res, next) {
  const { balance } = req.body;
  const { id } = req.params;

  try {
    const account = await updateBalanceAccountById(id, balance);

    global.logger.info(
      `PATCH /account/updateBalance/:id - ${JSON.stringify(account)}`
    );

    return res.json(account);
  } catch (error) {
    next(error);
  }
}
