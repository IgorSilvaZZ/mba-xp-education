import { CreateSolicitationDTO } from "../dtos/CreateSolicitationDTO";
import { SolicitationRepository } from "../repositories/SolicitationRepository";

export class CreateSolicitationUseCase {
    constructor(private solicitationRepository: SolicitationRepository) {}

    async handle(data: CreateSolicitationDTO) {
        const solicitation = await this.solicitationRepository.create(data);

        return solicitation;
    }

}