import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListAvailableCarsDTO } from "@modules/cars/dtos/IListAvailableCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Cars";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAvailable(filters?: IListAvailableCarsDTO): Promise<Car[]>;
}
