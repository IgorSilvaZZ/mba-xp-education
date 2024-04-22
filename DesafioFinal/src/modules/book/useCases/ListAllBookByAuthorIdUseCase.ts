import { AppErrors } from '../../../shared/errors/AppErrors';

import { AuthorRepository } from '../../author/repositories/AuthorRepository';
import { BookRepository } from '../repositories/BookRepository';

export class ListAllBookByAuthorIdUseCase {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
  ) {}

  async execute(authorId: number) {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new AppErrors('Author not exits!', 404);
    }

    const bookAuthor = await this.bookRepository.findBooksAuthor(authorId);

    return bookAuthor;
  }
}
