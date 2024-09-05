import express from "express";
import placeRoutes from "./routes/PlaceRoutes";
import activityRouter from "./routes/activity";
import userRouter from "./routes/users";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter, activityRouter);

app.get("/", (req, res) => {
  res.send("Hello Word");
  res.status(200).json({ status: "success", version: "1.0.0" });
});

app.use("/users", userRouter);
app.use("/place", placeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
