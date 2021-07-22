import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists", 422);
    }

    const specificationCreated = await this.specificationsRepository.create({
      name,
      description,
    });

    return specificationCreated;
  }
}
