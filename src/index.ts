import { configDotenv } from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { ds } from "./utils/datasource";
import bodyParser from "body-parser";
configDotenv();

import sampleRoutes from "./routes/sample.routes";

const PORT = process.env.PORT || 3000;

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

ds.initialize().then(() => {
  console.log("Database connected");
});

app.get("/", (req: Request, res: Response) => {
  res.send("API is up and running!");
});

app.use("/sample", sampleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
