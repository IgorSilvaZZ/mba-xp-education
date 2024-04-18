import { AuthorRepository } from '../repositories/AuthorRepository';

import { CreateAuthorDTO } from '../dtos/CreateAuthorDTO';
import { AppErrors } from '../../../shared/errors/AppErrors';

export class CreateAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute({ name, email, telephone }: CreateAuthorDTO) {
    const authorExists = await this.authorRepository.findByEmail(email);

    if (authorExists) {
      throw new AppErrors('Author already exists!');
    }

    const author = await this.authorRepository.create({
      name,
      email,
      telephone,
    });

    return author;
  }
}
