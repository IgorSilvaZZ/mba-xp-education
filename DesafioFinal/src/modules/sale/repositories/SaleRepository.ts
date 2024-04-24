import { Sale } from '../interfaces/Sale';

import { CreateSaleDTO } from '../dtos/CreateSaleDTO';

export abstract class SaleRepository {
  abstract findById(id: number): Promise<Sale | null>;
  abstract findAll(): Promise<Sale[]>;
  abstract findByClientId(fkClientId: number): Promise<Sale[]>;
  abstract findByBookId(fkBookId: number): Promise<Sale[]>;
  abstract findByAuthorId(authorId: number): Promise<Sale[]>;
  abstract create(data: CreateSaleDTO): Promise<Sale>;
}
