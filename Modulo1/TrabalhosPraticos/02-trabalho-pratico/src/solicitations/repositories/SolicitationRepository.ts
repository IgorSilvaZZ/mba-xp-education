import { Solicitation } from "../domains/entities/Solicitation";
import { Solicitations } from "../domains/entities/Solicitations";

import { CreateSolicitationDTO } from "../dtos/CreateSolicitationDTO";


export abstract class SolicitationRepository {
    abstract getAll(): Promise<Solicitations>;
    abstract create(data: CreateSolicitationDTO): Promise<Solicitation>;
}