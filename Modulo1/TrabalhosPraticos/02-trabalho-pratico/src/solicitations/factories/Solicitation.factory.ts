import { SolicitationFsRepository } from "../infra/fileSystem/repositories/SolicitationFsRepository";

import { CreateSolicitationUseCase } from "../useCases/CreateSolicitationUseCase";

import { GetSolicitationsUseCase } from "../useCases/GetSolicitationsUseCase";
import { SolicitationsController } from "../../shared/http/infra/controllers/solicitations.controller";

const fsSolicitationRepository = new SolicitationFsRepository();

const getSolicitationsUseCase = new GetSolicitationsUseCase(
  fsSolicitationRepository
);

const createSolicitationUseCase = new CreateSolicitationUseCase(
  fsSolicitationRepository
);

const solicitationController = new SolicitationsController(
  createSolicitationUseCase,
  getSolicitationsUseCase
);

export { solicitationController };
