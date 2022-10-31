import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

export class CreateRentalUseCase {
  constructor(private rentalRepository: IRentalsRepository) {}

  async execute(data: IRequest): Promise<void> {
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      data.car_id
    );

    if (carUnavailable) throw new AppError("Car unavailable");

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      data.user_id
    );

    if (rentalOpenToUser) throw new AppError("There's a rental for this user");
  }
}
