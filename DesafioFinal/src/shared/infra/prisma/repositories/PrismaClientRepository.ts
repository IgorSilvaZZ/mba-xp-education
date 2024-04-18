import { prisma } from "..";

import { Client } from "../../../../modules/client/interfaces/Client";
import { CreateClientDTO } from "../../../../modules/client/dtos/CreateClientDTO";

import { ClientRepository } from "../../../../modules/client/repositories/ClientRepository";

export class PrismaClientRepository implements ClientRepository {
  async findAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      select: {
        clientId: true,
        name: true,
        email: true,
        password: false,
        address: true,
        telephone: true,
      },
    });

    return clients;
  }

  async findById(id: number): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: { clientId: id },
    });

    return client;
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = await prisma.client.findFirst({
      where: {
        email,
      },
    });

    return client;
  }

  async create(data: CreateClientDTO): Promise<Client> {
    const client = await prisma.client.create({
      data,
    });

    return client;
  }
}
