import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookInfoRepository } from '../repositories/BookInfoRepository';
import { BookRepository } from '../repositories/BookRepository';

export class ListByIdBookUseCase {
  constructor(
    private bookRepository: BookRepository,
    private bookInfoRepository: BookInfoRepository,
  ) {}

  async execute(id: number) {
    const book = await this.bookRepository.findById(id);

    if (!book) {
      throw new AppErrors('Book not exists', 404);
    }

    const bookInfo = (await this.bookInfoRepository.findByBookId(id)) ?? {};

    const bookWithInfo = {
      ...book,
      bookInfo,
    };

    return bookWithInfo;
  }
}
