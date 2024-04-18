import { CreateAuthorDTO } from '../dtos/CreateAuthorDTO';
import { Author } from '../interfaces/Author';

export abstract class AuthorRepository {
  abstract findByEmail(email: string): Promise<Author | null>;
  abstract findById(id: number): Promise<Author | null>;
  abstract create(data: CreateAuthorDTO): Promise<Author>;
}
