import { BookInfo } from '../interfaces/BookInfo';
import { CreateBookInfoDTO } from '../dtos/CreateBookInfoDTO';
import { CreateEvaluationBookDTO } from '../dtos/CreateEvaluationBookDTO';

export abstract class BookInfoRepository {
  abstract create(data: CreateBookInfoDTO): Promise<BookInfo>;
  abstract createEvaluationBook(
    bookId: number,
    data: CreateEvaluationBookDTO,
  ): Promise<BookInfo>;
  abstract deleteBookInfo(bookId: number): Promise<void>;
  abstract deleteEvaluationBook(bookId: number, index: number): Promise<void>;
}
