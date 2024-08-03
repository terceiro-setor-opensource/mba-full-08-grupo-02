import express from 'express';
import { Request, Response } from 'express';
import userRouter from './routes';

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Word")
})


app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


