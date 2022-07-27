import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarsImagesReository } from "@modules/cars/repositories/implementations/ICarsImagesReository";

import { CarImage } from "../entities/CarImage";

export class CarsImagesReository implements ICarsImagesReository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(data: ICreateCarImageDTO): Promise<CarImage> {
    const car_image = this.repository.create(data);

    await this.repository.save(car_image);

    return car_image;
  }
}
