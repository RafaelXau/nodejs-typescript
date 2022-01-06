import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRquest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  private specificatrionsRepository: ISpecificationRepository;

  constructor(specificatrionsRepository: ISpecificationRepository) {
    this.specificatrionsRepository = specificatrionsRepository;
  }

  execute({ name, description }: IRquest): void {
    const specificationAlreadyExists =
      this.specificatrionsRepository.findByname(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificatrionsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
