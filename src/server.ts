import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ message: "Hello World!" });
});

app.listen(3333, () => console.log("Your Node API started on port 3333! 🚀"));
