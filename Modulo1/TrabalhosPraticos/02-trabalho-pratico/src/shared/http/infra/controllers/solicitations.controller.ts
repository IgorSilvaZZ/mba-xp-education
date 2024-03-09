import { Request, Response } from "express";

import { CreateSolicitationUseCase } from "../../../../solicitations/useCases/CreateSolicitationUseCase";
import { GetSolicitationsUseCase } from "../../../../solicitations/useCases/GetSolicitationsUseCase";

export class SolicitationsController {
  constructor(
    private createSolicitationUseCase: CreateSolicitationUseCase,
    private getSolicitationsUseCase: GetSolicitationsUseCase
  ) {}

  async get(req: Request, res: Response) {
    const solicitations = await this.getSolicitationsUseCase.handle();

    return res.json(solicitations);
  }

  async post(req: Request, res: Response) {
    const { cliente, produto, valor } = req.body;

    const solicitation = await this.createSolicitationUseCase.handle({
      cliente,
      produto,
      valor,
    });

    return res.status(201).json(solicitation);
  }
}
