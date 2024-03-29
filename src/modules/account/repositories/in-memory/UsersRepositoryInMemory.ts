import { User } from "@modules/account/infra/typeorm/entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/IUpdateUserAvatarDTO";
import { IUsersRepository } from "../implementations/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, {
      id: Math.random().toString(),
      created_at: new Date(),
      avatar: null,
      is_admin: false,
      ...data,
    });

    this.users.push(newUser);

    return newUser;
  }

  async updateAvatar(data: IUpdateUserAvatarDTO): Promise<User> {
    let userUpdated = {};

    this.users = this.users.map((user) => {
      if (user.id === data.id) {
        userUpdated = Object.assign(user, data);
        return userUpdated as User;
      }
      return user;
    });

    return userUpdated as User;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    console.log("user", user);
    return user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
