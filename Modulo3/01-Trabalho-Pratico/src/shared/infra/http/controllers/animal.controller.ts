import { Request, Response } from "express";

import { ListAllAnimalUseCase } from "../../../../modules/animais/useCases/ListAllAnimalUseCase";
import { FindByIdAnimalUseCase } from "../../../../modules/animais/useCases/FindByIdAnimalUseCase";
import { ListAllAnimalFindByProprietarioIdUseCase } from "../../../../modules/animais/useCases/ListAllAnimalFindByProprietarioIdUseCase";
import { CreateAnimalUseCase } from "../../../../modules/animais/useCases/CreateAnimalUseCase";
import { UpdateAnimalUseCase } from "../../../../modules/animais/useCases/UpdateAnimalUseCase";
import { DeleteAnimalUseCase } from "../../../../modules/animais/useCases/DeleteAnimalUseCase";

export class AnimalController {
  constructor(
    private listAllAnimalUseCase: ListAllAnimalUseCase,
    private findByIdAnimalUseCase: FindByIdAnimalUseCase,
    private listAllAnimalFindByProprietarioIdUseCase: ListAllAnimalFindByProprietarioIdUseCase,
    private createAnimalUseCase: CreateAnimalUseCase,
    private updateAnimalUseCase: UpdateAnimalUseCase,
    private deleteAnimalUseCase: DeleteAnimalUseCase
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

  async getById(req: Request, res: Response) {
    const { animalId } = req.params;

    try {

      const animal = await this.findByIdAnimalUseCase.execute(Number(animalId));

      return res.json(animal);
      
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo animal", error });
    }
  }

  async getByProprietarioId(req: Request, res: Response) {
    const { proprietarioId } = req.params;

    try {
      
      const animais = await this.listAllAnimalFindByProprietarioIdUseCase.execute(Number(proprietarioId));

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

  async delete(req: Request, res: Response) {
    const { animalId } = req.params;

    try {

      await this.deleteAnimalUseCase.execute(Number(animalId));

      return res.status(204);
      
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo animal", error });
    }

  }

}
