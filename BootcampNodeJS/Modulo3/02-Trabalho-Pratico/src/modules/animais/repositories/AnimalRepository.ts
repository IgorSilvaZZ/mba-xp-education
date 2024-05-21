import { Animal } from "../interfaces/Animal";

import { CreateAnimalDTO } from "../dtos/CreateAnimalDTO";
import { UpdateAnimalDTO } from "../dtos/UpdateAnimalDTO";

export abstract class AnimalRepository {
  abstract getAll(): Promise<Animal[]>;
  abstract findById(animalId: number): Promise<Animal | null>;
  abstract findByProprietarioId(fkProprietario: number): Promise<Animal[]>;
  abstract create(data: CreateAnimalDTO): Promise<Animal>;
  abstract update(animalId: number, data: UpdateAnimalDTO): Promise<Animal>;
  abstract delete(animalId: number): Promise<void>;
}
