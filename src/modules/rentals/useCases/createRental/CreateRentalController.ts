import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    const { id: user_id } = req.user;

    const createRentalUseCase = container.resolve(CreateRentalUseCase);

    const rentalCreated = await createRentalUseCase.execute({
      ...data,
      user_id,
    });

    return res.status(201).json(rentalCreated);
  }
}
