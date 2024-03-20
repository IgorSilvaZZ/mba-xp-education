import { ClientService } from '../service/client.service.js'

export class ClientController {
    constructor() {
        this._clientService = new ClientService();
    }

    async create(req, res, next) {
        const { name, cpf, phone, email, address } = req.body;

        try {
            if (!name || !cpf || !phone || !email || !address) {
                throw new Error('Name, CPF, Phone, Email and Address is required!')
            }

            res.json({});
            logger.info(`POST /client - ${JSON.stringify({ name, cpf, phone, email, address })}`);

        } catch (error) {
            next(error)
        }

    }
}