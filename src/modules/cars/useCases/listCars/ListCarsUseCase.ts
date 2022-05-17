import { inject, injectable } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";
import { ICarsRepository } from "@modules/cars/repositories/implementations/ICarsRepository";

@injectable()
export class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private CarsRepository: ICarsRepository
  ) {}

  async execute(filters?: IListAvailableCarsDTO): Promise<Car[]> {
    return this.CarsRepository.listAvailable({ ...filters });
  }
}
