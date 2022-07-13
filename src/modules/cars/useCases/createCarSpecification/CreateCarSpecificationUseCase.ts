import { ICarsRepository } from "@modules/cars/repositories/implementations/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/implementations/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

export class CreateCarSpecificationUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carsExists = await this.carsRepository.findById(car_id);
    if (!carsExists) throw new AppError("Car does not exists!");

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carsExists.specifications = specifications;

    console.log("carsExists", carsExists);
  }
}
