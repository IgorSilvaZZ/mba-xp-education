import { AppErrors } from '../../../shared/errors/AppErrors';
import { BookInfoRepository } from '../repositories/BookInfoRepository';

export class DeleteEvaluationBookUseCase {
  constructor(private bookInfoRepository: BookInfoRepository) {}

  async execute(bookId: number, indexEvaluation: number) {
    const bookInfoExists = await this.bookInfoRepository.findByBookId(bookId);

    if (!bookInfoExists) {
      throw new AppErrors('Book Info not exists!', 404);
    }

    const evaluationBookExists =
      await this.bookInfoRepository.findEvaluationByIndex(
        bookId,
        indexEvaluation,
      );

    if (!evaluationBookExists) {
      throw new AppErrors('Book evaluation not exists!', 404);
    }

    await this.bookInfoRepository.deleteEvaluationBook(bookId, indexEvaluation);
  }
}
