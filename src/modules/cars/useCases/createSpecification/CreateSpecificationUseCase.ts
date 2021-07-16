import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository } from "../../repositories/implementations/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) {}

  execute({ name, description }: IRequest): Specification {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    const specificationCreated = this.specificationsRepository.create({
      name,
      description,
    });

    return specificationCreated;
  }
}
