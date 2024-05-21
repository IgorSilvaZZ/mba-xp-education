import axios from "axios";

const username = "admin";
const password = "senha123";

const base64Credenciais = Buffer.from(`${username}:${password}`).toString(
  "base64"
);

const url = "http://localhost:3333/recurso-secreto";

const opcoes = {
  method: "GET",
  headers: {
    Authorization: `Basic ${base64Credenciais}`,
  },
};

axios(url, opcoes)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error);
  });
