import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryinMemory: CarsRepositoryInMemory;

describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryinMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryinMemory);
  });

  it("should be able to list all available cars", async () => {
    await carsRepositoryinMemory.create({
      name: "car name ",
      description: "car description",
      daily_rate: 20,
      license_plate: "ABC-9874",
      fine_amount: 5,
      brand: "brand car",
      category_id: "category car",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryinMemory.create({
      name: "car name ",
      description: "car description",
      daily_rate: 20,
      license_plate: "ABC-9874",
      fine_amount: 5,
      brand: "brand car",
      category_id: "category car",
    });

    const cars = await listCarsUseCase.execute({ brand: "brand car" });

    expect(cars).toHaveLength(1);
  });
});
