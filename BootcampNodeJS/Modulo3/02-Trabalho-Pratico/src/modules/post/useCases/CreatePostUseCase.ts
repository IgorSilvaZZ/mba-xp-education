import { PostRepository } from "../repositories/PostRepository";

import { CreatePostDTO } from "../dtos/CreatePostDTO";

export class CreatePostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute(data: CreatePostDTO) {
    const post = await this.postRepository.create(data);

    return post;
  }
}
