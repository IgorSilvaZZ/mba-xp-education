import express from "express";

const app = express();

app.use(express.json());

const usuarios = [
  { username: "admin", password: "senha123" },
  { username: "igor", password: "senha" },
];

// middleware
function autenticacaoBasica(req, res, next) {
  const header = req.headers["authorization"] || "";

  const [tipo, payload] = header.split(" ");

  if (tipo === "Basic") {
    const credenciaisDecodificadas = Buffer.from(payload, "base64").toString();
    const [usuario, senha] = credenciaisDecodificadas.split(":");

    const credenciais = usuarios.find((user) => user.username === usuario);

    if (credenciais && credenciais.password === senha) {
      return next();
    }
  }

  res.setHeader("WWW-Authenticate", "Basic");
  res.sendStatus(401);
}

app.get("/recurso-secreto", autenticacaoBasica, (req, res) => {
  res.send("Voce acessou um recurso secreto!");
});

app.listen(3333, () => console.log("Server is Running!"));
