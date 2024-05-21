import { Router } from "express";

import { postController } from "../../../factories/post.factory";

const postRouter = Router();

postRouter.get("/", (req, res) => {
  return postController.get(req, res);
});

postRouter.post("/", (req, res) => {
  return postController.create(req, res);
});

postRouter.post("/comentario", (req, res) => {
  return postController.createComentarioPost(req, res);
});

export { postRouter };
