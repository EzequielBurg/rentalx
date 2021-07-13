import { ImportCategoryController } from "./ImportCategoryControllerts";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

const importCategoryUseCase = new ImportCategoryUseCase();
export const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
);
