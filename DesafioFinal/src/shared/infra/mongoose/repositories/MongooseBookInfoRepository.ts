import BookInfoModel from '../models/BookInfo';

import {
  BookInfo,
  Evaluations,
} from '../../../../modules/book/interfaces/BookInfo';
import { BookInfoRepository } from '../../../../modules/book/repositories/BookInfoRepository';

import { CreateBookInfoDTO } from '../../../../modules/book/dtos/CreateBookInfoDTO';
import { CreateEvaluationBookDTO } from '../../../../modules/book/dtos/CreateEvaluationBookDTO';
import { UpdateBookInfoDTO } from '../../../../modules/book/dtos/UpdateBookInfoDTO';

export class MongooseBookInfoRepository implements BookInfoRepository {
  async findByBookId(id: number): Promise<BookInfo | null> {
    const bookInfo = await BookInfoModel.findOne({
      bookId: id,
    });

    return bookInfo;
  }

  async create(data: CreateBookInfoDTO): Promise<BookInfo> {
    const bookInfo = await BookInfoModel.create({
      ...data,
      evaluations: [],
    });

    return bookInfo;
  }

  async update(bookId: number, data: UpdateBookInfoDTO): Promise<void> {
    await BookInfoModel.updateOne(
      {
        bookId,
      },
      { $set: data },
    );
  }

  async findEvaluationByIndex(
    bookId: number,
    indexEvaluation: number,
  ): Promise<Evaluations | null> {
    const bookInfo = await BookInfoModel.findOne({ bookId });

    const evaluationExists = bookInfo?.evaluations[indexEvaluation] ?? null;

    return evaluationExists;
  }

  async createEvaluationBook(
    bookId: number,
    data: CreateEvaluationBookDTO,
  ): Promise<Evaluations> {
    const bookInfo = await BookInfoModel.findOne({
      bookId,
    });

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
    const bookInfo = await BookInfoModel.findOne({ bookId });

    bookInfo?.evaluations.splice(index, 1);

    await bookInfo?.save();
  }
}
