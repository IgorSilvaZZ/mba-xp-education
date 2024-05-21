export interface CreateSaleDTO {
  date: Date;
  fkClientId: number;
  fkBookId: number;
  value?: number;
}
