import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/implementations/IUsersRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const userAlreadyExsists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExsists) {
      throw new Error("This email already exists!");
    }

    const { password } = data;

    const passwordHash = await hash(password, 8);

    const userCreated = await this.usersRepository.create({
      ...data,
      password: passwordHash,
    });

    return userCreated;
  }
}
