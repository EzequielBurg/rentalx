import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../../dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../../../repositories/implementations/IUsersRepository";
import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ email });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  async updateAvatar(data: IUpdateUserAvatarDTO): Promise<User> {
    return this.repository.save(data);
  }
}
