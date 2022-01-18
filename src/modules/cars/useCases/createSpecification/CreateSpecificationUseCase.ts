import { inject, injectable } from "tsyringe";

import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

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
      throw new AppError("Specification already exists!");
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
