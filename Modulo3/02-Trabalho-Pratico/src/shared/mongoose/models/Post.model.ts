import { Document, Schema, model } from "mongoose";

import { Post } from "../../../modules/post/interfaces/Post";

interface PostDocument extends Document, Post {}

const comentarioSchema = new Schema({
  nome: { type: String, required: true },
  conteudo: { type: String, required: true },
});

const postSchema = new Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  comentarios: [comentarioSchema],
});

export default model<PostDocument>("Posts", postSchema);
