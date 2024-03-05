export interface CreateSolicitationDTO {
    cliente: string;
    produto: string;
    valor: number;
    entregue: boolean;
    timestamp?: Date;
}