import { AppErrors } from '../../../shared/errors/AppErrors';

import { SaleRepository } from '../repositories/SaleRepository';
import { BookRepository } from '../../book/repositories/BookRepository';
import { ClientRepository } from '../../client/repositories/ClientRepository';

import { CreateSaleDTO } from '../dtos/CreateSaleDTO';

export class CreateSaleUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private bookRepository: BookRepository,
    private clientRepository: ClientRepository,
  ) {}

  async execute({ date, fkClientId, fkBookId }: CreateSaleDTO) {
    const book = await this.bookRepository.findById(fkBookId);

    if (!book) {
      throw new AppErrors('Book not exists!', 404);
    }

    const client = await this.clientRepository.findById(fkClientId);

    if (!client) {
      throw new AppErrors('Client not exists!', 404);
    }

    if (book.stock <= 0) {
      throw new AppErrors('Book does not contain stock available!');
    }

    const newSaleData: CreateSaleDTO = {
      date: date ?? new Date(),
      fkClientId,
      fkBookId,
      value: book.value,
    };

    const sale = await this.saleRepository.create(newSaleData);

    await this.bookRepository.updateStock(fkBookId, book.stock - 1);

    return sale;
  }
}
