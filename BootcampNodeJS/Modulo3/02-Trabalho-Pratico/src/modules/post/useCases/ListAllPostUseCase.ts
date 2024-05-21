import { PostRepository } from "../repositories/PostRepository";

export class ListAllPostUseCase {
  constructor(private postRepository: PostRepository) {}

  async execute() {
    const posts = await this.postRepository.listAll();

    return posts;
  }
}
