import http from "http";

http
  .createServer((req, res) => {
    if (req.method === "GET" && req.url === "/test") {
      res.write("Get /test com sucesso!");
    } else {
      res.write("Hello World!");
    }

    res.statusCode = 200;

    res.end();

    // Escrever algo na tela do navegador
  })
  .listen(3333, () => {
    console.log("Server is Running!");
  });
