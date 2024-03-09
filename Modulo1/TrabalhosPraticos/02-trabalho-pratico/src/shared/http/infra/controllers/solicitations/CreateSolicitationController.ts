import { Request, Response } from "express";
import { CreateSolicitationUseCase } from "../../../../../solicitations/useCases/CreateSolicitationUseCase";

export class CreateSolicitationController {
  constructor(private createSolicitationUseCase: CreateSolicitationUseCase) {}

  async create(req: Request, res: Response) {
    const { cliente, produto, valor } = req.body;

    const solicitation = await this.createSolicitationUseCase.handle({
      cliente,
      produto,
      valor,
    });

    return res.status(201).json(solicitation);
  }
}
