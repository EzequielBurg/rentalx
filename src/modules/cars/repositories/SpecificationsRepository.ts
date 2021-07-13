import { Specification } from "../models/Specification";
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO,
} from "./ISpecificationsRepository";

export class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): Specification {
    const specification = new Specification(name, description);

    this.specifications.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}
