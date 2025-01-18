import express from "express";
import cors from "cors";
import placeRoutes from "./routes/PlaceRoutes";
import activityRouter from "./routes/activity";
import userRouter from "./routes/users";
import imageRoutes from "./routes/image";
import benefitsRoutes from "./routes/benefits";
import accountTypeRoutes from "./routes/accountType";
import accountRoutes from "./routes/account";
import addressRoutes from "./routes/address";
import feedbackRoutes from "./routes/feedback";
import favoritePlaceRoutes from "./routes/favoritePlace";
import authRoutes from "./routes/auth";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(userRouter, activityRouter, authRoutes);

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
app.use("/address", addressRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/favorite_places", favoritePlaceRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
