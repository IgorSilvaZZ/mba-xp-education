import express from "express";

const app = express();

app.use(express.json());

/* Caracteres Especiais da Rota */
// Todos os metodos HTTP que chegarem vao ser interpretados aqui
app.all("/testAll", (req, res) => {
  res.send(req.method);
});

// Quando colocar esse ponto de interrogação da a disponibilidade que a ultima letra seja opcional
// Entao ele pode ser passado com /test e /teste
app.get("/teste?", (_, res) => {
  res.send("/teste?");
});

// Quando colocar ao sinal de +, vai indicar que a ultima letra da rota pode ser repetida varias vezes
// Pode ser chamada /buz e também /buzz, /buzzz, /buzzzz e etc...
app.get("/buz+", (_, res) => {
  res.send("/buz+");
});

// O asteristico é como se fosse um coringa , qualquer palavra é aceita na chamada
// Exemplo: oneQualquerCoisaBlue, etc...
app.get("/one*Blue", (_, res) => {
  res.send("/one*Blue");
});

// Colocar como parenteses, mostra que é aquilo colocado dentro é tratado como unidade
// Aqui pode ser chamado /test ou /testing
app.post("/test(ing)?", (_, res) => {
  res.send("/test(ing)?");
});

/* Parametros da Rota */
app.get("/testParam/:id", (req, res) => {
  res.send(req.params.id);
});

/* Query Params */
app.get("/testQuery", (req, res) => {
  res.send(req.query);
});

/* next */
app.get(
  "/testMultipleHandlers",
  (req, res, next) => {
    res.send("Primeira CallBack");

    next();
  },
  (req, res) => {
    res.send("Segunda CallBack");
    res.end();
  }
);

/* next array */
const callback1 = (req, res, next) => {
  console.log("CallBack 1");
  next();
};

const callback2 = (req, res, next) => {
  console.log("CallBack 2");
  next();
};

const callback3 = (req, res) => {
  console.log("CallBack 3");
  res.close();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

app
  .route("/testRoute")
  .get((req, res) => {
    res.send("Teste GET");
  })
  .post((req, res) => {
    res.send("Teste POST");
  })
  .delete((req, res) => {
    res.send("Teste DELETE");
  });

app.listen(3333, () => console.log("Server is Running!"));
