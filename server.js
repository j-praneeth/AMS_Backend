// import express from "express";
// const app = express();

// import cors from "cors";
// app.use(cors());

// app.listen(9000);

// app.use(express.json());
// import connectDB from "./db.js";
// connectDB();

// // all routing imports

// import userroute from "./Routes/userRoutes.js";

// // routes Calls

// app.use("/api/users", userroute);


// app.get("/", (req, res) => {
//     res.send("Server is up and running!");
//   });
  

import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import userroute from "./Routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to DB
connectDB();

// Root Route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Routes
app.use("/api/users", userroute);

// Dynamic Port for Deployment
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port https://localhost:${PORT}/`));
