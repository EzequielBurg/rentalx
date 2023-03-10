import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (item) => item.car_id === car_id && item.end_date == null
    );
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (item) => item.user_id === user_id && item.end_date == null
    );
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const newRental = new Rental();

    Object.assign(newRental, {
      id: Math.random().toString(),
      start_date: new Date(),
      created_at: new Date(),
      ...data,
    } as Rental);

    this.rentals.push(newRental);

    return newRental;
  }
}
