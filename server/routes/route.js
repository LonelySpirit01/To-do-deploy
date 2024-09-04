import express, { Router } from "express";

import {
  addTodo,
  getAllTodos,
  toggleTodoDone,
  updateTodo,
  deleteTodo,
  payment,
} from "../controller/todo-controller.js";

const route = express.Router();

route.post("/todos", addTodo);
route.get("/todos", getAllTodos);
route.get("/todos/:id", toggleTodoDone);
route.put("/todos/:id", updateTodo);
route.delete("/todos/:id", deleteTodo);
route.post("/todos/checkout", payment);

export default route;
