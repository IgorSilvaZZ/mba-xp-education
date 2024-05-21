import { PostRepository } from "../repositories/PostRepository";

import { CreateComentarioDTO } from "../dtos/CreateComentarioDTO";

export class CreateComentarioUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: CreateComentarioDTO) {
    const postExists = await this.postRepository.findById(data.idPost);

    if (!postExists) {
      throw new Error("Post informado não existe!");
    }

    const comentario = await this.postRepository.createComentario(data);

    return comentario;
  }
}
