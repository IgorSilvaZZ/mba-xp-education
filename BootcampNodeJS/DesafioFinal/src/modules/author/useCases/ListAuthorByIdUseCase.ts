import { AppErrors } from '../../../shared/errors/AppErrors';
import { AuthorRepository } from '../repositories/AuthorRepository';

export class ListAuthorByIdUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(id: number) {
    const author = await this.authorRepository.findById(id);

    if (!author) {
      throw new AppErrors('Author not exists!', 404);
    }

    return author;
  }
}
