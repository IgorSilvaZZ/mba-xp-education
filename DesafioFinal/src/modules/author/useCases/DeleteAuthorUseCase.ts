import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookRepository } from '../../book/repositories/BookRepository';
import { AuthorRepository } from '../repositories/AuthorRepository';

export class DeleteAuthorUseCase {
  constructor(
    private authorRepository: AuthorRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute(id: number) {
    const authorExists = await this.authorRepository.findById(id);

    if (!authorExists) {
      throw new AppErrors('Author not exists!', 404);
    }

    const bookAuthors = await this.bookRepository.findBooksAuthor(id);

    if (bookAuthors.length > 0) {
      throw new AppErrors('Author contains books!');
    }

    await this.authorRepository.delete(id);
  }
}
