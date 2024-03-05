import { readFile, writeFile } from "fs/promises";

export async function findAllAccounts() {
  const accounts = JSON.parse(await readFile(global.fileName, "utf-8"));

  delete accounts.nextId;

  return accounts;
}

export async function findAccountById(id) {
  const data = await findAllAccounts();

  const account = data.accounts.find((item) => item.id === id);

  return account;
}

export async function saveAccount({ name, balance }) {
  const data = JSON.parse(await readFile(global.fileName, "utf-8"));

  let account = {
    name,
    balance,
  };

  account = {
    id: data.nextId++,
    ...account,
  };

  data.accounts.push(account);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return account;
}

export async function accountDeleteById(id) {
  const data = await findAllAccounts();

  data.accounts = data.accounts.filter((item) => item.id !== id);

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return data;
}

export async function accountUpdateById(id, { name, balance }) {
  const data = await findAllAccounts();

  let accountIndex = data.accounts.findIndex((item) => item.id === id);

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

  return account;
}

export async function accountUpdateBalanceById(id, balance) {
  const data = await findAllAccounts();

  let accountIndex = data.accounts.findIndex((item) => item.id === id);

  if (accountIndex === -1) {
    throw new Error("Account not exits!");
  }

  const account = {
    ...data.accounts[accountIndex],
    balance,
  };

  data.accounts[accountIndex] = account;

  await writeFile(global.fileName, JSON.stringify(data, null, 2));

  return account;
}
