import express from "express";
import placeRoutes from "./routes/PlaceRoutes";
import activityRouter from "./routes/activity";
import userRouter from "./routes/users";
import imageRoutes from "./routes/image";
import benefitsRoutes from "./routes/benefits";
import accountTypeRoutes from "./routes/accountType";
import accountRoutes from "./routes/account";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter, activityRouter);

app.get("/", (req, res) => {
  res.send("Hello Word");
  res.status(200).json({ status: "success", version: "1.0.0" });
});

app.use("/users", userRouter);
app.use("/places", placeRoutes);
app.use("/images", imageRoutes);
app.use("/benefits", benefitsRoutes);
app.use("/account_types", accountTypeRoutes);
app.use("/accounts", accountRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
