import { BookInfoRepository } from '../repositories/BookInfoRepository';

import { CreateEvaluationBookDTO } from '../dtos/CreateEvaluationBookDTO';
import { AppErrors } from '../../../shared/errors/AppErrors';

export class CreateEvaluationBookUseCase {
  constructor(private bookInfoRepository: BookInfoRepository) {}

  async execute(
    bookInfoId: number,
    createEvaluationBookDTO: CreateEvaluationBookDTO,
  ) {
    const bookInfoExists = await this.bookInfoRepository.findByBookId(
      bookInfoId,
    );

    if (!bookInfoExists) {
      throw new AppErrors('Book info not exists!', 404);
    }

    const evaluation = await this.bookInfoRepository.createEvaluationBook(
      bookInfoId,
      createEvaluationBookDTO,
    );

    return evaluation;
  }
}
