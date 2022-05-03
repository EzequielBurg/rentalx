import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListCarsController } from "@modules/cars/useCases/listCars/ListCarsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";

export const carsRoutes = Router();

const createCarController = new CreateCarController();
const listCarsController = new ListCarsController();

carsRoutes.post("", ensureAdmin, createCarController.handle);
carsRoutes.get("", listCarsController.handle);
