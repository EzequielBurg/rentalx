import { Specification } from "../models/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
}
