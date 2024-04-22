import { AppErrors } from '../../../shared/errors/AppErrors';
import { BookInfoRepository } from '../repositories/BookInfoRepository';

export class DeleteBookInfoUseCase {
  constructor(private bookInfoRepository: BookInfoRepository) {}

  async execute(bookInfoId: number) {
    const bookInfoExists = await this.bookInfoRepository.findByBookId(
      bookInfoId,
    );

    if (!bookInfoExists) {
      throw new AppErrors('Book info not exists!', 404);
    }

    await this.bookInfoRepository.deleteBookInfo(bookInfoId);
  }
}
