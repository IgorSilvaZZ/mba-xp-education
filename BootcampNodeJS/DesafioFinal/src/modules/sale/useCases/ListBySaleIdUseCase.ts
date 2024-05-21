import { AppErrors } from '../../../shared/errors/AppErrors';

import { SaleRepository } from '../repositories/SaleRepository';

export class ListBySaleIdUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute(id: number) {
    const sale = await this.saleRepository.findById(id);

    if (!sale) {
      throw new AppErrors('Sale not exists!', 404);
    }

    return sale;
  }
}
