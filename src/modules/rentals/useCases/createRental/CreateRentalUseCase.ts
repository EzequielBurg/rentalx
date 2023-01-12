import "reflect-metadata";
import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}
@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(data: IRequest): Promise<Rental> {
    const minimumHour = 24;

    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      data.car_id
    );

    if (carUnavailable) throw new AppError("Car unavailable");

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      data.user_id
    );

    if (rentalOpenToUser) throw new AppError("There's a rental for this user");

    const compare = this.dateProvider.compareInHours(
      new Date(),
      data.expected_return_date
    );

    if (compare < minimumHour) throw new AppError("Invalid return time");

    const rental = await this.rentalRepository.create(data);

    return rental;
  }
}
