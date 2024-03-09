import { SolicitationRepository } from "../repositories/SolicitationRepository";

export class GetSolicitationsUseCase {
  constructor(private solicitationRepository: SolicitationRepository) {}

  async handle() {
    const solicitations = await this.solicitationRepository.getAll();

    return solicitations;
  }
}
