import { Router } from "express";

import { CategoriesRepositories } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepositories = new CategoriesRepositories();

categoriesRoutes.post("", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepositories.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({ error: "Category already exists" });
  }

  const categoryCreated = categoriesRepositories.create({ name, description });

  return res.status(201).json(categoryCreated);
});

categoriesRoutes.get("/", (req, res) => {
  const allCategories = categoriesRepositories.list();

  return res.json(allCategories);
});

export { categoriesRoutes };
