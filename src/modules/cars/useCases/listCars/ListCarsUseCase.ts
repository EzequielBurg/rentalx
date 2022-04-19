import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/implementations/ICarsRepository";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private CarsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const Cars = await this.CarsRepository.list();

    return Cars;
  }
}
