import { AppErrors } from '../../../shared/errors/AppErrors';
import { AuthorRepository } from '../repositories/AuthorRepository';

export class DeleteAuthorUseCase {
  constructor(private authorRepository: AuthorRepository) {}

  async execute(id: number) {
    const authorExists = await this.authorRepository.findById(id);

    if (!authorExists) {
      throw new AppErrors('Author not exists!', 404);
    }

    await this.authorRepository.delete(id);
  }
}
