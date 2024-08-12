import express from 'express';
import userRouter from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello Word")
  res.status(200).json({ status : 'success', version: '1.0.0'})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


