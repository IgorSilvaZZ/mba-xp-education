export interface Sale {
  saleId: number;
  value: number;
  date: Date;
  fkClientId: number;
  fkBookId: number;
}
