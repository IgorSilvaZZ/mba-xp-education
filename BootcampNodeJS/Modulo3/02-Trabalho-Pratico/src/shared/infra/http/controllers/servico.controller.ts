import { Request, Response } from "express";

import { CreateServicoUseCase } from "../../../../modules/servicos/useCases/CreateServicoUseCase";
import { ListAllServicoFindByProprietarioIdUseCase } from "../../../../modules/servicos/useCases/ListAllServicoFindByProprietarioIdUseCase";
import { ListAllServicoUseCase } from "../../../../modules/servicos/useCases/ListAllServicoUseCase";

export class ServicoController {
  constructor(
    private listAllServicoUseCase: ListAllServicoUseCase,
    private listAllServicoFindByProprietarioId: ListAllServicoFindByProprietarioIdUseCase,
    private createServicoUseCase: CreateServicoUseCase
  ) {}

  async get(req: Request, res: Response) {
    try {
      const servicos = await this.listAllServicoUseCase.execute();

      return res.json(servicos);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao listar serviços", error });
    }
  }

  async getByProprietarioId(req: Request, res: Response) {
    const { proprietarioId } = req.params;

    try {
      const servicos = await this.listAllServicoFindByProprietarioId.execute(
        Number(proprietarioId)
      );

      return res.json(servicos);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao listar serviços de um proprietario", error });
    }
  }

  async create(req: Request, res: Response) {
    const { descricao, valor, fkAnimal } = req.body;

    try {
      const data = {
        descricao,
        valor,
        fkAnimal,
      };

      const servico = await this.createServicoUseCase.execute(data);

      return res.status(201).json(servico);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar um novo serviço", error });
    }
  }
}
