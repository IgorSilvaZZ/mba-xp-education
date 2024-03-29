import { Request, Response } from "express";

import { ListAllPostUseCase } from "../../../../modules/post/useCases/ListAllPostUseCase";
import { CreatePostUseCase } from "../../../../modules/post/useCases/CreatePostUseCase";
import { CreateComentarioUseCase } from "../../../../modules/post/useCases/CreateComentarioUseCase";

export class PostController {
  constructor(
    private listAllPostUseCase: ListAllPostUseCase,
    private createPostUseCase: CreatePostUseCase,
    private createComentarioUseCase: CreateComentarioUseCase
  ) {}

  async get(req: Request, res: Response) {
    try {
      const posts = await this.listAllPostUseCase.execute();

      return res.json(posts);
    } catch (error) {
      return res.status(400).json({ message: "Erro ao listar posts", error });
    }
  }

  async create(req: Request, res: Response) {
    const { titulo, conteudo } = req.body;

    try {
      const data = {
        titulo,
        conteudo,
      };

      const post = await this.createPostUseCase.execute(data);

      return res.status(201).json(post);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo post", error });
    }
  }

  async createComentarioPost(req: Request, res: Response) {
    const { idPost, nome, conteudo } = req.body;

    try {
      const data = {
        idPost,
        nome,
        conteudo,
      };

      const comentario = await this.createComentarioUseCase.execute(data);

      return res.status(201).json(comentario);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Erro ao criar novo comentario para o post", error });
    }
  }
}
