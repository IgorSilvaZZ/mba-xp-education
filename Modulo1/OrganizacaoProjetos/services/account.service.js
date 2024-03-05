import {
  accountDeleteById,
  accountUpdateBalanceById,
  accountUpdateById,
  findAccountById,
  findAllAccounts,
  saveAccount,
} from "../repositories/account.repository.js";

export async function listAccounts() {
  const accounts = await findAllAccounts();

  return accounts;
}

export async function listAccountById(id) {
  const account = await findAccountById(Number(id));

  if (!account) {
    throw new Error("Account not found!");
  }

  return account;
}

export async function newAccount({ name, balance }) {
  if (!name || balance === null) {
    throw new Error("Field name and balance is required");
  }

  const account = saveAccount({ name, balance });

  return account;
}

export async function deleteAccountById(id) {
  const accountExists = await findAccountById(Number(id));

  if (!accountExists) {
    throw new Error("Account not found!");
  }

  const data = await accountDeleteById(Number(id));

  return data;
}

export async function updateAccountById(id, { name, balance }) {
  if (!name || balance === null) {
    throw new Error("Field name and balance is invalid");
  }

  const accountExists = await findAccountById(Number(id));

  if (!accountExists) {
    throw new Error("Account not found!");
  }

  const account = await accountUpdateById(Number(id), { name, balance });

  return account;
}

export async function updateBalanceAccountById(id, balance) {
  if (balance === null) {
    throw new Error("Field balance is invalid!");
  }

  const accountExists = await findAccountById(Number(id));

  if (!accountExists) {
    throw new Error("Account not found!");
  }

  const account = await accountUpdateBalanceById(Number(id), balance);

  return account;
}
