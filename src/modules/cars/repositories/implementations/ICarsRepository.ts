import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
}
