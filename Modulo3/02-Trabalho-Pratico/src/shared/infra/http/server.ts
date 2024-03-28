import express from "express";

import { proprietarioRouter } from "./routes/proprietario.routes";
import { animalRouter } from "./routes/animal.routes";
import { servicoRouter } from "./routes/servico.routes";

const app = express();

app.use(express.json());

app.use("/proprietario", proprietarioRouter);
app.use("/animal", animalRouter);
app.use("/servico", servicoRouter);

app.listen(3333, () => console.log("PetShop Api Started! 🐾"));
