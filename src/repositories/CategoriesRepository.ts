import { Category } from "../models/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export class CategoriesRepositories {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category(name, description);

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
}
