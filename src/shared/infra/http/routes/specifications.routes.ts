import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

import { ensureAdmin } from "../middlewares/ensureAdmin";

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationController = new ListSpecificationsController();

specificationsRoutes.post(
  "",
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("", listSpecificationController.handle);
