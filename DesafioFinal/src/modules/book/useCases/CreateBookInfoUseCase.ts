import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookInfoRepository } from '../repositories/BookInfoRepository';
import { BookRepository } from '../repositories/BookRepository';

import { CreateBookInfoDTO } from '../dtos/CreateBookInfoDTO';

export class CreateBookInfoUseCase {
  constructor(
    private bookInfoRepository: BookInfoRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute({ bookId, description, pages, publishing }: CreateBookInfoDTO) {
    const bookExists = await this.bookRepository.findById(bookId);

    if (!bookExists) {
      throw new AppErrors('Book not exists!', 404);
    }

    const bookInfo = await this.bookInfoRepository.create({
      bookId,
      description,
      pages,
      publishing,
    });

    return bookInfo;
  }
}
