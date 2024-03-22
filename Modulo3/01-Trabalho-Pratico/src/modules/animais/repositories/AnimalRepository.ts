import { Animal } from "../interfaces/Animal";

import { CreateAnimalDTO } from "../dtos/CreateAnimalDTO";
import { UpdateAnimalDTO } from "../dtos/UpdateAnimalDTO";

export abstract class AnimalRepository {
  abstract getAll(): Promise<Animal[]>;
  abstract create(data: CreateAnimalDTO): Promise<Animal>;
  abstract update(animalId: number, data: UpdateAnimalDTO): Promise<Animal>;
}
