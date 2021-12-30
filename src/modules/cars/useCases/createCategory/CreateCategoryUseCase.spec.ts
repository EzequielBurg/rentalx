import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("Should be able to create a category", async () => {
    const categoryCreated = await createCategoryUseCase.execute({
      name: "category test",
      description: "category test desc",
    });

    const checkCategory = await categoriesRepositoryInMemory.findByName(
      categoryCreated.name
    );

    expect(checkCategory).toHaveProperty("id");
  });

  it("Should not be able to create a repeated category", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: "category test",
        description: "category test desc",
      });

      await createCategoryUseCase.execute({
        name: "category test",
        description: "category test desc",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
