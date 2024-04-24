import { AppErrors } from '../../../shared/errors/AppErrors';
import { AuthorRepository } from '../../author/repositories/AuthorRepository';
import { SaleRepository } from '../repositories/SaleRepository';

export class ListSalesByAuthorIdUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private authorRepository: AuthorRepository,
  ) {}

  async execute(authorId: number) {
    const author = await this.authorRepository.findById(authorId);

    if (!author) {
      throw new AppErrors('Author not exists!', 404);
    }

    const sales = await this.saleRepository.findByClientId(authorId);

    return sales;
  }
}
