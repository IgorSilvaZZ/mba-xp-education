import { BookRepository } from '../repositories/BookRepository';

export class ListAllBookUseCase {
  constructor(private bookRepository: BookRepository) {}

  async execute() {
    const books = await this.bookRepository.findAll();

    return books;
  }
}
