import { Category } from "../../entities/Category";
import { ICategoryRepository } from "../../repositories/ICategoriesRepositorys";

class ListCategoriesUseCase {
  private categoriesRepository: ICategoryRepository;

  constructor(categoriesRepository: ICategoryRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
