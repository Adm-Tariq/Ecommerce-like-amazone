import express from "express";
import data from "./data.js";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
const port = 5000;
app.use(cors());

app.get("/api/products", (req, res) => res.send(data.products));

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((x) => x.slug === req.params.slug);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Page Not Found" });
  }
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Page Not Found" });
  }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
