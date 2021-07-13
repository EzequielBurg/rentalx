import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const categoryCreated = this.createCategoryUseCase.execute({
      name,
      description,
    });

    return res.status(201).json(categoryCreated);
  }
}
