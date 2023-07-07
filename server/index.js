import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { todosRouter } from "./routes/todos.js";

const app = express();

mongoose.connect("mongodb+srv://saberali1789:todosaberali@todo.pfsw3og.mongodb.net/")

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({welcom : "Welcom"})

})



app.use("/", userRouter)
app.use("/todos", todosRouter)

app.listen(3001, () => {
  console.log("Server Work 3001");
});



