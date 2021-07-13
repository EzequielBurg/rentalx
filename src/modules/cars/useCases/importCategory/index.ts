import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ImportCategoryController } from "./ImportCategoryControllerts";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
