import express from "express";
import activityRouter from "./routes/activity";
import userRouter from "./routes/users";

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter, activityRouter);

app.get("/", (req, res) => {
  res.send("Hello Word")
  res.status(200).json({ status : 'success', version: '1.0.0'})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
