import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

app.listen(9000);

app.use(express.json());
import connectDB from "./db.js";
connectDB();

// all routing imports

import userroute from "./Routes/userRoutes.js";

// routes Calls

app.use("/api/users", userroute);
