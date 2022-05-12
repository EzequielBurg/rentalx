import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../implementations/ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async listAvailable(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter(
        (car) =>
          (name && name === car.name) ||
          (brand && brand === car.brand) ||
          (category_id && category_id === car.category_id)
      );
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const newCar = {
      id: Math.random().toString(),
      available: true,
      created_at: new Date(),
      ...data,
    };

    this.cars.push(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((item) => item.license_plate === license_plate);
  }
}
