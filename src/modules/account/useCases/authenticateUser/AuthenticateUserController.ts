import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

    const authInfo = await authenticateUseCase.execute({ email, password });

    return res.json(authInfo);
  }
}
