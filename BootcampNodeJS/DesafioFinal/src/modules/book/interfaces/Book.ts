import { Author } from '../../author/interfaces/Author';

export interface Book {
  bookId: number;
  name: string;
  value: number;
  stock: number;
  fkAuthorId: number;
  author?: Author;
}
