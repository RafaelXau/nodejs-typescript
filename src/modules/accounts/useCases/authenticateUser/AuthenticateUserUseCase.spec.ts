import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let createUserUseCase: CreateUserUseCase;
let authenticateUserUsecase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUsecase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      name: "Rafael Honório",
      email: "rafaelhs@h2dev.com.br",
      password: "123456",
      driver_license: "246810",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUsecase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should NOT be able to authenticate a nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUsecase.execute({
        email: "fake@mail.com.br",
        password: "2456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should NOT be able to authenticate with incorrect password", async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "Rafael Honório",
        email: "rafaelhs@h2dev.com.br",
        password: "123456",
        driver_license: "246810",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUsecase.execute({
        email: user.email,
        password: "user.password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
