import express from "express";
import data from "./data.js";
import cors from "cors";

import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import expressAsyncHandler from "express-async-handler";
import orderRouter from "./routes/orderRoutes.js";

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 5000;
app.use(cors());

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.get("/api/products", (req, res) => res.send(data.products));

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
