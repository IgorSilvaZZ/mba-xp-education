import { prisma } from '..';

import { Sale } from '../../../../modules/sale/interfaces/Sale';
import { SaleRepository } from '../../../../modules/sale/repositories/SaleRepository';

import { CreateSaleDTO } from '../../../../modules/sale/dtos/CreateSaleDTO';

export class PrismaSaleRepository implements SaleRepository {
  async findAll(): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      include: {
        client: true,
        book: true,
      },
    });

    return sales;
  }

  async findById(id: number): Promise<Sale | null> {
    const sale = await prisma.sale.findFirst({
      where: {
        saleId: id,
      },
      include: {
        client: true,
        book: true,
      },
    });

    return sale;
  }

  async findByClientId(fkClientId: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: {
        fkClientId,
      },
      include: {
        book: true,
      },
    });

    return sales;
  }

  async findByBookId(fkBookId: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: {
        fkBookId,
      },
      include: {
        client: true,
      },
    });

    return sales;
  }

  async findByAuthorId(authorId: number): Promise<Sale[]> {
    const sales = await prisma.sale.findMany({
      where: {
        book: {
          fkAuthorId: authorId,
        },
      },
      include: {
        book: {
          include: {
            author: true,
          },
        },
        client: true,
      },
    });

    return sales;
  }

  async create(data: CreateSaleDTO): Promise<Sale> {
    const sale = await prisma.sale.create({
      data: {
        ...data,
        value: data.value ?? 0,
      },
    });

    return sale;
  }
}
