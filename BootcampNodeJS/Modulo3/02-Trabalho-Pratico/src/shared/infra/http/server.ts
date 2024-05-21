import express from "express";

import { connectMongo } from "../../mongoose";

import { proprietarioRouter } from "./routes/proprietario.routes";
import { animalRouter } from "./routes/animal.routes";
import { servicoRouter } from "./routes/servico.routes";
import { postRouter } from "./routes/post.routes";

const app = express();

app.use(express.json());

connectMongo();

app.use("/proprietario", proprietarioRouter);
app.use("/animal", animalRouter);
app.use("/servico", servicoRouter);
app.use("/post", postRouter);

app.listen(3333, () => console.log("PetShop Api Started! 🐾"));
