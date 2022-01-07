import { inject, injectable } from "tsyringe";

import { SpecificationRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRquest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject(SpecificationRepository)
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRquest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByname(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
