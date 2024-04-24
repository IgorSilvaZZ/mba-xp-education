export interface CreateBookDTO {
  name: string;
  value: number;
  fkAuthorId: number;
  stock?: number;
}
