import { getRepository, Repository } from "typeorm";

import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { ISpecificationsRepository } from "@modules/cars/repositories/implementations/ISpecificationsRepository";

import { Specification } from "../entities/Specification";

export class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification;
  }
}
