import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImage";

export interface ICarsImagesReository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}
