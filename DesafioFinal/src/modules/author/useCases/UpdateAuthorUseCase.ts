import { AppErrors } from '../../../shared/errors/AppErrors';
import { AuthorRepository } from '../repositories/AuthorRepository';
import { UpdateAuthorDTO } from '../dtos/UpdateAuthorDTO';

export class UpdateAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(id: number, { name, email, telephone }: UpdateAuthorDTO) {
    const authorExists = await this.authorRepository.findById(id);

    if (!authorExists) {
      throw new AppErrors('Author not exists!', 404);
    }

    const authorUpdated = await this.authorRepository.update(id, {
      name,
      email,
      telephone,
    });

    return authorUpdated;
  }
}
