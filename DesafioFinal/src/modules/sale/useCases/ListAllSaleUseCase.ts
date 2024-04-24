import { SaleRepository } from '../repositories/SaleRepository';

export class ListAllSaleUseCase {
  constructor(private saleRepository: SaleRepository) {}

  async execute() {
    const sales = await this.saleRepository.findAll();

    return sales;
  }
}
