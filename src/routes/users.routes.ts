import { Router } from "express";

import { CreateUserController } from "../modules/account/useCases/CreateUserController";

export const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("", createUserController.handle);