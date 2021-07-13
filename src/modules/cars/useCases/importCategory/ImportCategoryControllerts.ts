import { Request, Response } from "express";

import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    await this.importCategoryUseCase
      .execute(file)
      .catch((err) => res.status(422).json({ message: err.toString() }));

    return res.status(201).send();
  }
}
