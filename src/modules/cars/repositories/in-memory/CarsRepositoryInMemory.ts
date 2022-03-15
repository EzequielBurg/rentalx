import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

import { ICarsRepository } from "../implementations/ICarsRepository";

export class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<void> {
    const newCar = {
      id: Math.random().toString(),
      created_at: new Date(),
      ...data,
    };

    this.cars.push(newCar);
  }

  // async list(): Promise<Category[]> {
  //   return this.categories;
  // }

  // async findByName(name: string): Promise<Category> {
  //   const category = this.categories.find((category) => category.name === name);

  //   return category;
  // }
}
