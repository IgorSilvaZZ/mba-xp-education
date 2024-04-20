import BookInfoModel from '../models/BookInfo';

import {
  BookInfo,
  Evaluations,
} from '../../../../modules/book/interfaces/BookInfo';
import { BookInfoRepository } from '../../../../modules/book/repositories/BookInfoRepository';

import { CreateBookInfoDTO } from '../../../../modules/book/dtos/CreateBookInfoDTO';
import { CreateEvaluationBookDTO } from '../../../../modules/book/dtos/CreateEvaluationBookDTO';

export class MongooseBookInfoRepository implements BookInfoRepository {
  async create(data: CreateBookInfoDTO): Promise<BookInfo> {
    const bookInfo = await BookInfoModel.create({
      ...data,
      evaluations: [],
    });

    return bookInfo;
  }

  async createEvaluationBook(
    bookId: number,
    data: CreateEvaluationBookDTO,
  ): Promise<Evaluations> {
    const bookInfo = await BookInfoModel.findById(bookId);

    const newEvaluation = {
      ...data,
    };

    bookInfo?.evaluations.push(newEvaluation);

    await bookInfo?.save();

    return newEvaluation;
  }

  async deleteBookInfo(bookId: number): Promise<void> {
    await BookInfoModel.deleteOne({ bookId });
  }

  async deleteEvaluationBook(bookId: number, index: number): Promise<void> {
    const bookInfo = await BookInfoModel.findById(bookId);

    bookInfo?.evaluations.splice(index, 1);

    await bookInfo?.save();
  }
}
