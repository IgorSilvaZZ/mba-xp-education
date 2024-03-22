import { Request, Response } from "express";

import { ListAllProprietariosUseCase } from "../../../../modules/proprietarios/useCases/ListAllProprietariosUseCase";
import { CreateProprietarioUseCase } from "../../../../modules/proprietarios/useCases/CreateProprietarioUseCase";
import { UpdateProprietarioUseCase } from "../../../../modules/proprietarios/useCases/UpdateProprietarioUseCase";
import { FindByProprietarioUseCase } from "../../../../modules/proprietarios/useCases/FindByProprietarioUseCase";
import { DeleteProprietarioUseCase } from "../../../../modules/proprietarios/useCases/DeleteProprietarioUseCase";

export class ProprietarioController {
  constructor(
    private listAllProprietariosUseCase: ListAllProprietariosUseCase,
    private findByProprietarioUseCase: FindByProprietarioUseCase,
    private createProprietarioUseCase: CreateProprietarioUseCase,
    private updateProprietarioUseCase: UpdateProprietarioUseCase,
    private deleteProprietarioUseCase: DeleteProprietarioUseCase
  ) {}

  async get(req: Request, res: Response) {
    try {
      const proprietarios = await this.listAllProprietariosUseCase.execute();

      return res.json(proprietarios);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo proprietario", error });
    }
  }

  async getById(req: Request, res: Response) {
    const { proprietarioId } = req.params;

    try {
      const proprietario = await this.findByProprietarioUseCase.execute(
        Number(proprietarioId)
      );

      return res.json(proprietario);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo proprietario", error });
    }
  }

  async create(req: Request, res: Response) {
    const { nome, telefone } = req.body;

    try {
      const data = {
        nome,
        telefone,
      };

      const proprietario = await this.createProprietarioUseCase.execute(data);

      return res.status(201).json(proprietario);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo proprietario", error });
    }
  }

  async update(req: Request, res: Response) {
    const { proprietarioId } = req.params;
    const { nome, telefone } = req.body;

    try {
      const dataUpdated = {
        nome,
        telefone,
      };

      const updateProprietario = await this.updateProprietarioUseCase.execute(
        Number(proprietarioId),
        dataUpdated
      );

      return res.json(updateProprietario);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo proprietario", error });
    }
  }

  async delete(req: Request, res: Response) {
    const { proprietarioId } = req.params;

    try {

      await this.deleteProprietarioUseCase.execute(Number(proprietarioId));

      return res.status(204)
      
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo proprietario", error });
    }

  }

}
