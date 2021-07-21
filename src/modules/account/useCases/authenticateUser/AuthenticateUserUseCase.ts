import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/implementations/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Omit<User, "password">;
  token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password incorrect!");
    }

    if (!(await compare(password, user.password))) {
      throw new Error("Email or password incorrect!");
    }

    const token = sign({}, process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: "1d",
    });

    delete user.password;

    return { user, token };
  }
}
