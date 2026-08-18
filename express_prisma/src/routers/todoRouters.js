import express from "express";
import db from "../db.js";

const router = express.Router();

// Get Todo
router.get("/", (req, res) => {
  const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
  const todos = getTodos.all(req.userId);

  res.json(todos);
})

//Add Todo
router.post("/", (req, res) => {
  const { task } = req.body ?? {};

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      message: "Task is required",
    });
  }

  const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);

  const result = insertTodo.run(req.userId, task.trim());

  return res.status(201).json({
    id: Number(result.lastInsertRowid),
    task: task.trim(),
    completed: 0,
  });
})

//update Todo
router.patch("/:id", (req, res) => {
  const { task, completed } = req.body ?? {};
  const { id } = req.params;
  // const { page } = req.query;

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      message: "Task is required",
    });
  }

  const updateTodo = db.prepare(`UPDATE todos SET task= ?, completed= ? WHERE id= ?`);

  const result = updateTodo.run(task.trim(), completed, id);

  return res.status(201).send({
    id: Number(id),
    task: task.trim(),
    completed: completed
  })
})

// Delete todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const deleteTodo = db.prepare(`DELETE FROM todos WHERE id= ? AND user_id= ?`);
  const result = deleteTodo.run(id, userId);

  return res.status(301).json({
    message: "Deleted successful"
  })
})

export default router;