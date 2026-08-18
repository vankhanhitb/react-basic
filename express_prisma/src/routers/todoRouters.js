import express from "express";
import db from "../db.js";
import prisma from "../prismaClient.js";

const router = express.Router();

// Get Todo
router.get("/", async (req, res) => {
  // const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');
  // const todos = getTodos.all(req.userId);
  const todos = await prisma.todo.findMany({
    where: {
      userId: req.userId
    }
  })

  res.json(todos);
})

//Add Todo
router.post("/",async (req, res) => {
  const { task } = req.body ?? {};

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      message: "Task is required",
    });
  }

  // const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`);

  // const result = insertTodo.run(req.userId, task.trim());

  const todo = await prisma.todo.create({
    data: {
      task,
      userId: req.userId
    }
  })

  return res.json(todo);
})

//update Todo
router.patch("/:id", async (req, res) => {
  const { task, completed } = req.body ?? {};
  const { id } = req.params;
  // const { page } = req.query;

  if (typeof task !== "string" || !task.trim()) {
    return res.status(400).json({
      message: "Task is required",
    });
  }

  // const updateTodo = db.prepare(`UPDATE todos SET task= ?, completed= ? WHERE id= ?`);
  // const result = updateTodo.run(task.trim(), completed, id);

  const updateTodo = await prisma.todo.update({
    where: {
      id: parseInt(id),
      userId: req.userId
    },
    data: {
      task: task.trim(),
      completed: !!completed
    }
  })

  return res.json(updateTodo)
})

// Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  // const deleteTodo = db.prepare(`DELETE FROM todos WHERE id= ? AND user_id= ?`);
  // const result = deleteTodo.run(id, userId);

  const deleteTodo = await prisma.todo.delete({
    where: {
      id: parseInt(id),
      userId
    }
  })

  return res.json({
    message: "Deleted successful"
  })
})

export default router;