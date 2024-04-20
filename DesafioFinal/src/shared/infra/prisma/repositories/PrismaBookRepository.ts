import { prisma } from '..';

import { Book } from '../../../../modules/book/interfaces/Book';
import { BookRepository } from '../../../../modules/book/repositories/BookRepository';

import { CreateBookDTO } from '../../../../modules/book/dtos/CreateBookDTO';
import { UpdateBookDTO } from '../../../../modules/book/dtos/UpdateBookDTO';

export class PrismaBookRepository implements BookRepository {
  async findAll(): Promise<Book[]> {
    const books = await prisma.book.findMany({
      include: {
        author: true,
      },
    });

    return books;
  }

  async findByName(name: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        name,
      },
    });

    return book;
  }

  async findById(id: number): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        bookId: id,
      },
      include: {
        author: true,
      },
    });

    return book;
  }

  async findBooksAuthor(fkAuthorId: number): Promise<Book[]> {
    const booksAuthor = await prisma.book.findMany({
      where: { fkAuthorId },
    });

    return booksAuthor;
  }

  async create(data: CreateBookDTO): Promise<Book> {
    const book = await prisma.book.create({
      data: {
        ...data,
        stock: 0,
      },
    });

    return book;
  }

  async update(id: number, data: UpdateBookDTO): Promise<Book> {
    const bookUpdated = await prisma.book.update({
      where: {
        bookId: id,
      },
      data,
    });

    return bookUpdated;
  }

  async updateStock(id: number, stock: number): Promise<Book> {
    const bookStockUpdated = await prisma.book.update({
      where: {
        bookId: id,
      },
      data: {
        stock,
      },
    });

    return bookStockUpdated;
  }
}
