
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