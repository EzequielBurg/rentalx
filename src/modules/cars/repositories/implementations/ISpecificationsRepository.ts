import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
