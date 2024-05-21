import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookInfoRepository } from '../repositories/BookInfoRepository';

import { UpdateBookInfoDTO } from '../dtos/UpdateBookInfoDTO';

export class UpdateBookInfoUseCase {
  constructor(private bookInfoRepository: BookInfoRepository) {}

  async execute(id: number, data: UpdateBookInfoDTO) {
    const bookInfoExists = await this.bookInfoRepository.findByBookId(id);

    if (!bookInfoExists) {
      throw new AppErrors('Book Info not exists', 404);
    }

    await this.bookInfoRepository.update(id, data);
  }
}
