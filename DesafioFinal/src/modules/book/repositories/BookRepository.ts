import { Book } from '../interfaces/Book';

import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { UpdateBookDTO } from '../dtos/UpdateBookDTO';

export abstract class BookRepository {
  abstract findById(id: number): Promise<Book | null>;
  abstract findAll(): Promise<Book[]>;
  abstract create(data: CreateBookDTO): Promise<Book>;
  abstract update(id: number, data: UpdateBookDTO): Promise<Book>;
}
