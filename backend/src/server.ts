import express from "express";
import { Request, Response } from "express";
import userRouter from "./routes";
import placeRoutes from "./routes/PlaceRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello Word");
  res.status(200).json({ status: "success", version: "1.0.0" });
});

app.use("/users", userRouter);
app.use("/place", placeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
