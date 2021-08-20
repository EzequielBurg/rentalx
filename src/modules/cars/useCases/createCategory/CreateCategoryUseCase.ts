import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists", 422);
    }

    const categoryCreated = await this.categoriesRepository.create({
      name,
      description,
    });

    return categoryCreated;
  }
}
