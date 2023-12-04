import express from "express";
import data from "./data.js";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";

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

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);

app.get("/api/products", (req, res) => res.send(data.products));

app.listen(port, () => console.log(`listening on port ${port}!`));
