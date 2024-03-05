export interface Solicitation {
    id: number;
    cliente: string;
    produto: string;
    valor: number;
    entregue: boolean;
    timestamp: Date;
}