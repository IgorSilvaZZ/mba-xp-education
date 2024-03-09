import { CreateSolicitationController } from "../../shared/http/infra/controllers/solicitations/CreateSolicitationController";
import { SolicitationFsRepository } from "../infra/fileSystem/repositories/SolicitationFsRepository";
import { CreateSolicitationUseCase } from "../useCases/CreateSolicitationUseCase";

export default (): CreateSolicitationController => {
  const fsSolicitationRepository = new SolicitationFsRepository();

  const createSolicitationUseCase = new CreateSolicitationUseCase(
    fsSolicitationRepository
  );

  const createSolicitationController = new CreateSolicitationController(
    createSolicitationUseCase
  );

  return createSolicitationController;
};
