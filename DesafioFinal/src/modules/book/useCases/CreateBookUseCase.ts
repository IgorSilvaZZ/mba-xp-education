import { AppErrors } from '../../../shared/errors/AppErrors';

import { BookRepository } from '../repositories/BookRepository';

import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { AuthorRepository } from '../../author/repositories/AuthorRepository';

export class CreateBookUseCase {
  constructor(
    private bookRepository: BookRepository,
    private authorRepository: AuthorRepository,
  ) {}

  async execute({ name, value, fkAuthorId, stock }: CreateBookDTO) {
    const authorExits = await this.authorRepository.findById(fkAuthorId);

    if (!authorExits) {
      throw new AppErrors('Author not exists!', 404);
    }

    const bookExists = await this.bookRepository.findByName(name);

    // Verificando se é exatamente igual com que existe no banco para atualizar o stock
    if (
      bookExists &&
      bookExists.fkAuthorId === fkAuthorId &&
      bookExists.value === value
    ) {
      const newStock = bookExists.stock + 1;

      const bookUpdated = await this.bookRepository.updateStock(
        bookExists.bookId,
        newStock,
      );

      return bookUpdated;
    } else {
      const book = await this.bookRepository.create({
        name,
        value,
        fkAuthorId,
        stock: stock ?? 1,
      });

      return book;
    }
  }
}
