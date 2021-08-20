import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../implementations/ICategoriesRepository";

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create(category: ICreateCategoryDTO): Promise<Category> {
    const newCategory = {
      id: Math.random().toString(),
      created_at: new Date(),
      ...category,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}
