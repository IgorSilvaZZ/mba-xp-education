import { Request, Response } from "express";

import { CreateSolicitationDTO } from "./dtos/CreateSolicitation.dto";

import { SolicitationsService } from "./solicitations.service";
import { UpdateSolicitationDTO } from "./dtos/UpdateSolicitation.dto";

export class SolicitationsController {
    async getById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            
            const solicitationsService = new SolicitationsService();

            const solicitation = await solicitationsService.getSolicitationById(Number(id));

            return res.json(solicitation);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }

    async getTotalDeliveredByClient(req: Request, res: Response) {
        const { client } = req.query;
        
        try {

            const solicitationsService = new SolicitationsService();

            const totalDeliveredClient = await solicitationsService.getTotalDeliveredSolicitationsByClient(String(client));

            return res.json(totalDeliveredClient);
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }

    async getTotalDeliveredProduct(req: Request, res: Response) {
        const { product } = req.query;

        try {
            
            const solicitationsService = new SolicitationsService();

            const totalDeliveredProduct = await solicitationsService.getTotalDeliveredSolicitationsByProduct(String(product));

            return res.json(totalDeliveredProduct);
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }

    async getMaxSolicitations(req: Request, res: Response) {
        try {

            const solicitationsService = new SolicitationsService();

            const maxSolicitations = await solicitationsService.getMaxSolicitations();

            return res.json(maxSolicitations);
            
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async create(req: Request, res: Response) {
        const { cliente, produto, valor } = req.body;

        const solicitationsService = new SolicitationsService();

        const dataSolicitation: CreateSolicitationDTO = {
            cliente,
            produto,
            valor,
            entregue: false,
            timestamp: new Date()
        }

        try {
            const solicitation = await solicitationsService.createSolicitation(dataSolicitation);

            return res.status(201).json(solicitation);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }

    async update(req: Request, res: Response) {
        const { id } = req.params;

        const { cliente, valor, produto, entregue } = req.body;
        
        try {
            const solicitationsService = new SolicitationsService();

            const updateSolicitation: UpdateSolicitationDTO = {
                cliente, 
                valor, 
                produto, 
                entregue
            }

            const updatedSolicitation = await solicitationsService.updateSolicitation(Number(id), updateSolicitation);
            
            return res.json(updatedSolicitation);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }

    async updateDelivered(req: Request, res: Response) {
        const { id } = req.params;

        const { entregue } = req.body;

        try {
            
            const solicitationsService = new SolicitationsService();
            
            const deliveredUpdated = await solicitationsService.updateDeliveredById(Number(id), entregue);

            return res.json(deliveredUpdated);
        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        try {

            const solicitationsService = new SolicitationsService();
            
            await solicitationsService.deleteSolicitationById(Number(id));

            return res.end();

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }

    }
}