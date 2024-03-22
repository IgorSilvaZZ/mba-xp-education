import express from "express";

import { proprietarioRouter } from "./routes/proprietario.routes";

const app = express();

app.use(express.json());

app.use("/proprietario", proprietarioRouter);

app.listen(3333, () => console.log("PetShop Api Started! 🐾"));
