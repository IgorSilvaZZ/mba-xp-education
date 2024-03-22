import { prisma } from "..";

import { AnimalRepository } from "../../../modules/animais/repositories/AnimalRepository";

import { Animal } from "../../../modules/animais/interfaces/Animal";
import { CreateAnimalDTO } from "../../../modules/animais/dtos/CreateAnimalDTO";
import { UpdateAnimalDTO } from "../../../modules/animais/dtos/UpdateAnimalDTO";

export class PrismaAnimalRepository implements AnimalRepository {
  async getAll(): Promise<Animal[]> {
    const animais = await prisma.animais.findMany();

    return animais;
  }

  async create(data: CreateAnimalDTO): Promise<Animal> {
    const animal = await prisma.animais.create({
      data,
    });

    return animal;
  }

  async update(animalId: number, data: UpdateAnimalDTO): Promise<Animal> {
    const animalUpdated = await prisma.animais.update({
      where: { animalId },
      data,
    });

    return animalUpdated;
  }
}
