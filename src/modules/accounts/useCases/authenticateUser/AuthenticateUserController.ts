import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUsecase = container.resolve(AuthenticateUserUseCase);

    try {
      const data = await authenticateUserUsecase.execute({ email, password });
      return response.json(data);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { AuthenticateUserController };
