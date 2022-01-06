import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ImportCategoryControlller } from "./ImportCategoryController";
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export default (): ImportCategoryControlller => {
  const categoriesRepository = new CategoriesRepository();

  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);

  const importCategoryControlller = new ImportCategoryControlller(
    importCategoryUseCase
  );

  return importCategoryControlller;
};
