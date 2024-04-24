import { AppErrors } from '../../../shared/errors/AppErrors';

import { ClientRepository } from '../../client/repositories/ClientRepository';
import { SaleRepository } from '../repositories/SaleRepository';

export class ListByClientIdUseCase {
  constructor(
    private saleRepository: SaleRepository,
    private clientRepository: ClientRepository,
  ) {}

  async execute(fkClientId: number) {
    const client = await this.clientRepository.findById(fkClientId);

    if (!client) {
      throw new AppErrors('Client not exists!', 404);
    }

    const sales = await this.saleRepository.findByClientId(fkClientId);

    return sales;
  }
}
