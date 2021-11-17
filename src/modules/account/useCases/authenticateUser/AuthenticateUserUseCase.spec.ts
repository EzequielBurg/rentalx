import { ICreateUserDTO } from "@modules/account/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/account/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "00123",
      email: "user@user.com",
      password: "user123",
      name: "user test",
    };

    const newUser = await createUserUseCase.execute(user);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    });

    expect(authenticatedUser).toHaveProperty("token");
  });

  it("should not be able to authenticate a non existing user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "jaguara.com",
        password: "jaguara",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
