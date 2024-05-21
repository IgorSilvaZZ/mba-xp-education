import { Document, Schema, model } from 'mongoose';

import { BookInfo } from '../../../../modules/book/interfaces/BookInfo';

interface BookInfoDocument extends Document, BookInfo {}

const EvaluationsSchema = new Schema({
  name: { type: String },
  note: { type: Number },
  assessment: { type: String },
});

const BookInfoSchema = new Schema({
  bookId: { type: Number, required: true },
  description: { type: String, required: true },
  pages: { type: Number, required: true },
  publishing: { type: String, required: true },
  evaluations: [EvaluationsSchema],
});

export default model<BookInfoDocument>('BookInfo', BookInfoSchema);
