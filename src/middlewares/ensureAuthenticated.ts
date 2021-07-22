import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/account/repositories/UsersRepository";

interface ITokenPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token missing", 401);
  }

  const [, jwtToken] = token.split(" ");

  try {
    const decoded = verify(jwtToken, process.env.SECRET_KEY);

    const { sub: user_id } = decoded as ITokenPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("You can't access this resource", 401);
    }

    return next();
  } catch {
    throw new AppError("Invvalid JWT token", 401);
  }
}
