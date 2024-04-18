import { prisma } from '..';

import { CreateAuthorDTO } from '../../../../modules/author/dtos/CreateAuthorDTO';

import { Author } from '../../../../modules/author/interfaces/Author';
import { AuthorRepository } from '../../../../modules/author/repositories/AuthorRepository';

export class PrismaAuthorRepository implements AuthorRepository {
  async findById(id: number): Promise<Author | null> {
    const author = await prisma.author.findUnique({
      where: {
        authorId: id,
      },
    });

    return author;
  }

  async findByEmail(email: string): Promise<Author | null> {
    const author = await prisma.author.findFirst({
      where: {
        email: email,
      },
    });

    return author;
  }

  async create(data: CreateAuthorDTO): Promise<Author> {
    const author = await prisma.author.create({
      data,
    });

    return author;
  }
}
