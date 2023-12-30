import express from "express";
import { connectDB } from "./config/dbConnection";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.get("/", (req, res) => res.send("Hello World!"));
app.use(express.json());
app.use(cors(corsOptions));
app.use("/auth", authRoutes);
app.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port}!`);
});
