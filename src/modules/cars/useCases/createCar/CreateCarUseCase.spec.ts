import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "car name ",
      description: "car description",
      daily_rate: 20,
      license_plate: "ABC-9874",
      fine_amount: 5,
      brand: "brand car",
      category_id: "category car",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with existing license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "car 1 ",
        description: "car description",
        daily_rate: 20,
        license_plate: "license car",
        fine_amount: 5,
        brand: "brand car",
        category_id: "category car",
      });

      await createCarUseCase.execute({
        name: "car 2 ",
        description: "car description",
        daily_rate: 20,
        license_plate: "license car",
        fine_amount: 5,
        brand: "brand car",
        category_id: "category car",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car with default availability", async () => {
    const car = await createCarUseCase.execute({
      name: "car available",
      description: "car description",
      daily_rate: 20,
      license_plate: "ABC-9874",
      fine_amount: 5,
      brand: "brand car",
      category_id: "category car",
    });

    expect(car.available).toBe(true);
  });
});
