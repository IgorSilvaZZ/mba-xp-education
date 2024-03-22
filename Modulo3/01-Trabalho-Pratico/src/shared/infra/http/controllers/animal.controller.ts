import { Request, Response } from "express";

import { ListAllAnimalUseCase } from "../../../../modules/animais/useCases/ListAllAnimalUseCase";
import { CreateAnimalUseCase } from "../../../../modules/animais/useCases/CreateAnimalUseCase";
import { UpdateAnimalUseCase } from "../../../../modules/animais/useCases/UpdateAnimalUseCase";

export class AnimalController {
  constructor(
    private listAllAnimalUseCase: ListAllAnimalUseCase,
    private createAnimalUseCase: CreateAnimalUseCase,
    private updateAnimalUseCase: UpdateAnimalUseCase
  ) {}

  async get(req: Request, res: Response) {
    try {
      const animais = await this.listAllAnimalUseCase.handle();

      return res.json(animais);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo animal", error });
    }
  }

  async create(req: Request, res: Response) {
    const { nome, tipo, fkProprietario } = req.body;

    try {
      const data = {
        nome,
        tipo,
        fkProprietario,
      };

      const animal = await this.createAnimalUseCase.execute(data);

      return res.status(201).json(animal);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo animal", error });
    }
  }

  async update(req: Request, res: Response) {
    const { animalId } = req.params;
    const { nome, tipo, fkProprietario } = req.body;

    try {
      const dataUpdated = {
        nome,
        tipo,
        fkProprietario,
      };

      const animalUpdated = await this.updateAnimalUseCase.execute(
        Number(animalId),
        dataUpdated
      );

      return res.json(animalUpdated);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo animal", error });
    }
  }
}
