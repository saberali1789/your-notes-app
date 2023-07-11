import express from "express";
import { TodoModel } from "../models/Todo.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const response = await TodoModel.find({ userOwner: userId });
    res.json({ response });
  } catch (err) {
    res.json(err);
  }
});

router.post("/", async (req, res) => {
  const todo = new TodoModel(req.body);
  try {
    const response = await todo.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.get("/complete/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (!todo) {
      res.json({ message: "Todo not found!" });
      return;
    }
    todo.complete = !todo.complete;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const result = await TodoModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

export { router as todosRouter };
