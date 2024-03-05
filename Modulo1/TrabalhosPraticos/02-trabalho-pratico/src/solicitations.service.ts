import { CreateSolicitationDTO } from './dtos/CreateSolicitation.dto';
import { UpdateSolicitationDTO } from './dtos/UpdateSolicitation.dto';

import { Solicitations, getSolicitationsFile, writeSolicitationsFile } from "./utils/solicitationsFile";

export class SolicitationsService {
    async getIndexSolicitationById(id: number, solicitationsList: Solicitations) {
        const findProductIndex = solicitationsList.pedidos.findIndex(item => item.id === id);

        if (findProductIndex === -1) {
            return null;
        }

        return findProductIndex;
    }

    async getSolicitationById(id: number) {
        const solicitationsList = await getSolicitationsFile();

        const findProductIndex = await this.getIndexSolicitationById(id, solicitationsList);

        if (!findProductIndex) {
            throw new Error("Product is not exists!");
        }

        const solicitation = solicitationsList.pedidos.find(item => item.id === id);

        return solicitation;
    }

    async getTotalDeliveredSolicitationsByClient(client: string) {
        const solicitationsList = await getSolicitationsFile();

        const solicitationsClient = solicitationsList.pedidos.filter(item => item.cliente === client);

        if (solicitationsClient.length <= 0) {
            throw new Error("Client does not exists!");
        }

        let totalDeliveredSolicitationsClient = 0;
        
        for (let solicitation of solicitationsClient) {
            if (solicitation.entregue) {
                totalDeliveredSolicitationsClient += solicitation.valor;
            }
        }

        return { totalDeliveredSolicitationsClient }; 

    }

    async getTotalDeliveredSolicitationsByProduct(product: string) {
        const solicitationsList = await getSolicitationsFile();

        const solicitationsProduct = solicitationsList.pedidos.filter(item => item.produto === product);

        let totalDeliveredSolicitationsProduct = 0;
        
        for (let solicitation of solicitationsProduct) {
            if (solicitation.entregue) {
                totalDeliveredSolicitationsProduct += solicitation.valor;
            }
        }

        return { totalDeliveredSolicitationsProduct }
    }

    async getMaxSolicitations() {
        const solicitationsList = await getSolicitationsFile();

        type ProductList = {
            name: string;
            quantity: number;
        }

        const products: ProductList[] = [];

        const productResult = [];

        for (let solicitation of solicitationsList.pedidos) {
            if (solicitation.entregue) {
                let productFind = products.findIndex(item => item.name === solicitation.produto);

                if (productFind === -1) {
                    products.push({ name: solicitation.produto, quantity: 1 })
                } else {
                    products[productFind].quantity++;
                }
            } 
        }

        const descProductsList = products.sort((a, b) => b.quantity - a.quantity);

        for (let product of descProductsList) {
            productResult.push(`${product.name} - ${product.quantity}`);
        }

        return productResult;

    }

    async createSolicitation(data: CreateSolicitationDTO) {
        
        const solicitationsList = await getSolicitationsFile();

        const solicitationsData = {
            id: solicitationsList.nextId++,
            ...data,
        };

        solicitationsList.pedidos.push(solicitationsData);

        await writeSolicitationsFile(solicitationsList);

        return solicitationsData;
    }

    async updateSolicitation(id: number, { cliente, produto, valor, entregue }: UpdateSolicitationDTO) {
        const solicitationsList = await getSolicitationsFile();

        const findProductIndex = await this.getIndexSolicitationById(id, solicitationsList);

        if (findProductIndex === -1) {
            throw new Error("Product is not exists!");
        }

        if (!cliente) {
            throw new Error("Invalid field 'cliente'!")
        }

        if (!produto) {
            throw new Error("Invalid field 'produto'!")
        }

        if (valor <= 0 || valor === null) {
            throw new Error("Invalid field 'valor'!")
        }

        if (typeof entregue !== 'boolean') {
            throw new Error("Invalid field 'entregue'!")
        }

        const productIndex = Number(findProductIndex);

        const solicitationUpdated = {
            ...solicitationsList.pedidos[productIndex],
            cliente, 
            produto, 
            valor, 
            entregue
        }

        solicitationsList.pedidos[productIndex] = solicitationUpdated;

        await writeSolicitationsFile(solicitationsList);

        return solicitationUpdated;

    }

    async updateDeliveredById(id: number, delivered: boolean) {
        const solicitationsList = await getSolicitationsFile();

        const findProductIndex = await this.getIndexSolicitationById(id, solicitationsList);

        if (!findProductIndex) {
            throw new Error("Product is not exists!");
        }

        const productIndex = Number(findProductIndex);

        if (typeof delivered !== 'boolean') {
            throw new Error("Invalid field 'entregue'!")
        }
        
        const solicitationUpdated = {
            ...solicitationsList.pedidos[productIndex],
            entregue: delivered
        };

        solicitationsList.pedidos[productIndex] = solicitationUpdated;

        await writeSolicitationsFile(solicitationsList);

        return solicitationUpdated;
    }

    async deleteSolicitationById(id: number) {
        const solicitationsList = await getSolicitationsFile();

        const findProductIndex = await this.getIndexSolicitationById(id, solicitationsList);

        if (!findProductIndex) {
            throw new Error("Product is not exists!");
        };

        solicitationsList.pedidos = solicitationsList.pedidos.filter(item => item.id !== id);

        await writeSolicitationsFile(solicitationsList);
    }

}