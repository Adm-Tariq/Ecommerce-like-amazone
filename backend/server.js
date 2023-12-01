import express from "express";
import data from "./data.js";
import cors from "cors";

const app = express();
const port = 5000;
app.use(cors());

app.get("/api/products", (req, res) => res.send(data.products));

app.listen(port, () => console.log(`listening on port ${port}!`));
