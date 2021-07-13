import { Category } from "../../models/Category";
import { ICategoriesRepository } from "../../repositories/implementations/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists");
    }

    const categoryCreated = this.categoriesRepository.create({
      name,
      description,
    });

    return categoryCreated;
  }
}
