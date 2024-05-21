import { PostRepository } from "../../../modules/post/repositories/PostRepository";

import PostModel from "../models/Post.model";
import { Post, Comentario } from "../../../modules/post/interfaces/Post";

import { CreateComentarioDTO } from "../../../modules/post/dtos/CreateComentarioDTO";
import { CreatePostDTO } from "../../../modules/post/dtos/CreatePostDTO";

export class MongoosePostRepository implements PostRepository {
  async listAll(): Promise<Post[]> {
    const posts = await PostModel.find({}).exec();

    return posts;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = await PostModel.findById(postId).exec();

    return post;
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const post = await PostModel.create({
      ...data,
      comentarios: [],
    });

    return post;
  }

  async createComentario(data: CreateComentarioDTO): Promise<Comentario> {
    const post = await PostModel.findById(data.idPost);

    const dataComentario = {
      nome: data.nome,
      conteudo: data.conteudo,
    };

    post?.comentarios.push(dataComentario);

    await post?.save();

    return dataComentario;
  }
}
