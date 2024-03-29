import { MongoosePostRepository } from "../mongoose/repositories/MongoosePostRepository";

import { PostController } from "../infra/http/controllers/post.controller";

import { CreateComentarioUseCase } from "../../modules/post/useCases/CreateComentarioUseCase";
import { CreatePostUseCase } from "../../modules/post/useCases/CreatePostUseCase";
import { ListAllPostUseCase } from "../../modules/post/useCases/ListAllPostUseCase";

const mongoosePostRepository = new MongoosePostRepository();

const listAllPostUseCase = new ListAllPostUseCase(mongoosePostRepository);

const createPostUseCase = new CreatePostUseCase(mongoosePostRepository);

const createComentarioUseCase = new CreateComentarioUseCase(
  mongoosePostRepository
);

const postController = new PostController(
  listAllPostUseCase,
  createPostUseCase,
  createComentarioUseCase
);

export { postController };
