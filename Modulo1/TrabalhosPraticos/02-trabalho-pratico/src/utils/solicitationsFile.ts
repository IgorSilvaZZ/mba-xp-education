import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export interface Solicitations {
    nextId: number;
    pedidos: {
        id: number;
        cliente: string;
        produto: string;
        valor: number;
        entregue: boolean;
        timestamp: Date;
    }[]
}

export async function getSolicitationsFile(): Promise<Solicitations> {
    try {
        const solicitations = JSON.parse(await readFile(join(__dirname, '..', 'files', 'pedidos.json'), 'utf-8')) as Solicitations;

        return solicitations;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function writeSolicitationsFile(data: Solicitations) {
    try {
        await writeFile(join(__dirname, '..', 'files', 'pedidos.json'), JSON.stringify(data, null, 2));
    } catch (error: any) {
        throw new Error(error.message);
    }
}