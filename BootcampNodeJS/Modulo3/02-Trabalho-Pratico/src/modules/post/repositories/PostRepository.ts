import { Comentario, Post } from "../interfaces/Post";

import { CreatePostDTO } from "../dtos/CreatePostDTO";
import { CreateComentarioDTO } from "../dtos/CreateComentarioDTO";

export abstract class PostRepository {
  abstract listAll(): Promise<Post[]>;
  abstract findById(postId: string): Promise<Post | null>;
  abstract create(data: CreatePostDTO): Promise<Post>;
  abstract createComentario(data: CreateComentarioDTO): Promise<Comentario>;
}
