import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookRepository } from '../repositories/BookRepository';

import { UpdateBookDTO } from '../dtos/UpdateBookDTO';

export class UpdateBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute(id: number, { value }: UpdateBookDTO) {
    const bookExists = await this.bookRepository.findById(id);

    if (!bookExists) {
      throw new AppErrors('Book not exists', 404);
    }

    const bookUpdated = await this.bookRepository.update(id, { value });

    return bookUpdated;
  }
}
