import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/IUpdateUserAvatarDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../implementations/IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    const newUser = {
      id: Math.random().toString(),
      created_at: new Date(),
      avatar: null,
      is_admin: false,
      ...data,
    };

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
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
