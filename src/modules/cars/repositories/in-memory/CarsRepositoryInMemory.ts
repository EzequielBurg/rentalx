import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../implementations/ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async listAvailable({
    name,
    brand,
    category_id,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const cars = this.cars.filter(
      (car) =>
        car.available ||
        (name && name === car.name) ||
        (brand && brand === car.brand) ||
        (category_id && category_id === car.category_id)
    );
    return cars;
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const newCar = {
      id: Math.random().toString(),
      available: true,
      created_at: new Date(),
      specifications: [],
      ...data,
    };

    this.cars.push(newCar);

    return newCar;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((item) => item.license_plate === license_plate);
  }
}
