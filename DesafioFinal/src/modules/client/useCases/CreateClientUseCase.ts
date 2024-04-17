import { hash } from 'bcryptjs';

import { AppErrors } from '../../../shared/infra/errors/AppErrors';

import { CreateClientDTO } from "../dtos/CreateClientDTO";

import { ClientRepository } from "../repositories/ClientRepository";

export class CreateClientUseCase {

    constructor (private clientRepository: ClientRepository) {}

    async execute({ name, email, password, address, telephone }: CreateClientDTO) {

        const clientExists = await this.clientRepository.findByEmail(email);

        if (clientExists) {
            throw new AppErrors('Client already exists!');
        }

        const passwordHash = await hash(password, 8);

        const client = await this.clientRepository.create({
            name,
            email,
            password: passwordHash,
            address,
            telephone
        });

        return client;
    }
}