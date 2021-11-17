import "reflect-metadata";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/implementations/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

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
      throw new AppError("This email already exists!", 422);
    }

    const { password } = data;

    const passwordHash = await hash(password, 8);

    const userCreated = await this.usersRepository.create({
      ...data,
      password: passwordHash,
    });

    delete userCreated.password;

    return userCreated;
  }
}
