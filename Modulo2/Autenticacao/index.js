import express from "express";
import basicAuth from "express-basic-auth";
import cors from "cors";
import winston, { format } from "winston";
import { readFile, writeFile } from "fs/promises";

import { accountRouter } from "./accounts.js";

function getRole(username) {
  if (username === "admin") {
    return "admin";
  } else if (username === "igor") {
    return "role1";
  }
}

function authorize(...allowed) {
  const isAllowed = (role) => allowed.indexOf(role) > -1;

  return (req, res, next) => {
    if (req.auth.user) {
      const role = getRole(req.auth.user);

      if (isAllowed(role)) {
        next();
      } else {
        return res.status(401).json({ message: "Role not allowed" });
      }
    } else {
      return res.status(403).json({ message: "User not found!" });
    }
  };
}

const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.fileName = "accounts.json";

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-bank-api.log" }),
  ],
  format: format.combine(
    format.label({ label: "my-bank-api" }),
    format.timestamp(),
    myFormat
  ),
});

const app = express();

app.use(express.json());
app.use(
  basicAuth({
    authorizer: (username, password) => {
      const userMatch = basicAuth.safeCompare(username, "admin");
      const passwordMatch = basicAuth.safeCompare(password, "admin");

      const userMatch2 = basicAuth.safeCompare(username, "igor");
      const passwordMatch2 = basicAuth.safeCompare(password, "senha");

      return (userMatch && passwordMatch) || (userMatch2 && passwordMatch2);
    },
  })
);

app.use("/account", authorize("admin"), accountRouter);

app.use(
  cors({
    origin: "*",
  })
);

app.listen(3333, async () => {
  try {
    await readFile(global.fileName);

    global.logger.info("My Bank Api is Running!");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };

    try {
      await writeFile(global.fileName, JSON.stringify(initialJson, null, 2));

      global.logger.info("My Bank Api is Running!");
    } catch (error) {
      global.logger.error(error);
    }
  }
});
