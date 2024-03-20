import express from "express";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { randomUUID } from "node:crypto";

function ensureAuthenticate(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = jwt.verify(token, "YOUR_SECRET_KEY");

    const userExists = users.find((user) => user.id == user_id);

    if (!userExists) {
      return res.status(401).json({ message: "User not found!" });
    }

    req.user_id = user_id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token!" });
  }
}

const app = express();

let users = [];

app.use(express.json());

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((user) => user.email === email);

  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  const passwordHash = await hash(password, 8);

  const id = randomUUID();

  users.push({
    id,
    name,
    email,
    password: passwordHash,
  });

  return res.status(201).json({ id, name, email });
});

app.post("/users/auth", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((item) => item.email == email);

  if (!user) {
    return res.status(401).json({ message: "Email/Password incorrect!" });
  }

  if (!(await compare(password, user.password))) {
    return res.status(401).json({ message: "Email/Password incorrect!" });
  }

  try {
    const token = jwt.sign({}, "YOUR_SECRET_KEY", {
      subject: user.id,
      expiresIn: "1d",
    });

    return res.json({ access_token: token });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.get("/users", ensureAuthenticate, (req, res) => {
  return res.json(users);
});

app.listen(3333, console.log("Api Started!"));
