import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

app.listen(3333, () => console.log("Your Node API started on port 3333! 🚀"));
