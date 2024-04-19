import { prisma } from '..';

import { CreateAuthorDTO } from '../../../../modules/author/dtos/CreateAuthorDTO';
import { UpdateAuthorDTO } from '../../../../modules/author/dtos/UpdateAuthorDTO';

import { Author } from '../../../../modules/author/interfaces/Author';
import { AuthorRepository } from '../../../../modules/author/repositories/AuthorRepository';

export class PrismaAuthorRepository implements AuthorRepository {
  async listAll(): Promise<Author[]> {
    const authors = await prisma.author.findMany();

    return authors;
  }

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

  async update(id: number, data: UpdateAuthorDTO): Promise<Author> {
    const updateAuthor = await prisma.author.update({
      where: { authorId: id },
      data,
    });

    return updateAuthor;
  }

  async delete(id: number): Promise<void> {
    await prisma.author.delete({
      where: { authorId: id },
    });
  }
}
