import { AppErrors } from '../../../shared/errors/AppErrors';
import { BookRepository } from '../../book/repositories/BookRepository';
import { SaleRepository } from '../repositories/SaleRepository';

export class ListSalesByBookIdUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private bookRepository: BookRepository,
  ) {}

  async execute(fkBookId: number) {
    const book = await this.bookRepository.findById(fkBookId);

    if (!book) {
      throw new AppErrors('Book not exists!', 404);
    }

    const sales = await this.saleRepository.findByBookId(fkBookId);

    return sales;
  }
}
