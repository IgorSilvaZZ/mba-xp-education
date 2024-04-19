import { AuthorRepository } from '../repositories/AuthorRepository';

export class ListAllAuthorsUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute() {
    const authors = await this.authorRepository.listAll();

    return authors;
  }
}
