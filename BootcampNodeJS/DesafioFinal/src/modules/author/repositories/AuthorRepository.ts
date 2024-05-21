import { Author } from '../interfaces/Author';

import { CreateAuthorDTO } from '../dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from '../dtos/UpdateAuthorDTO';

export abstract class AuthorRepository {
  abstract listAll(): Promise<Author[]>;
  abstract findByEmail(email: string): Promise<Author | null>;
  abstract findById(id: number): Promise<Author | null>;
  abstract create(data: CreateAuthorDTO): Promise<Author>;
  abstract update(id: number, data: UpdateAuthorDTO): Promise<Author>;
  abstract delete(id: number): Promise<void>;
}
