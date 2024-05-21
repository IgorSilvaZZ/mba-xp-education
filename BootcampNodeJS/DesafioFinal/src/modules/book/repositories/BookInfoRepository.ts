import { BookInfo, Evaluations } from '../interfaces/BookInfo';
import { CreateBookInfoDTO } from '../dtos/CreateBookInfoDTO';
import { CreateEvaluationBookDTO } from '../dtos/CreateEvaluationBookDTO';
import { UpdateBookInfoDTO } from '../dtos/UpdateBookInfoDTO';

export abstract class BookInfoRepository {
  abstract findByBookId(id: number): Promise<BookInfo | null>;
  abstract create(data: CreateBookInfoDTO): Promise<BookInfo>;
  abstract update(bookId: number, data: UpdateBookInfoDTO): Promise<void>;
  abstract createEvaluationBook(
    bookId: number,
    data: CreateEvaluationBookDTO,
  ): Promise<Evaluations>;
  abstract findEvaluationByIndex(
    bookId: number,
    indexEvaluation: number,
  ): Promise<Evaluations | null>;
  abstract deleteBookInfo(bookId: number): Promise<void>;
  abstract deleteEvaluationBook(bookId: number, index: number): Promise<void>;
}
