import express, { type Request, type Response } from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

// Configuração do banco de dados
const db = mysql.createPool({
  host: process.env.DBHOST || "",
  user: process.env.DBUSER || "",
  password: process.env.DBPASSWORD || "",
  database: process.env.DATABASE || "",
});

// GET tasks
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST task
app.post("/tasks", async (req: Request, res: Response) => {
  const { title, description, status, priority } = req.body;
  try {
    const [result]: any = await db.query(
      "INSERT INTO tasks (title, description, status, priority) VALUES (?, ?, ?, ?)",
      [title, description, status, priority],
    );
    res
      .status(201)
      .json({ id: result.insertId, title, description, status, priority });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT task
app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  const fields: string[] = [];
  const values: any[] = [];

  if (title) {
    fields.push("title = ?");
    values.push(title);
  }
  if (description) {
    fields.push("description = ?");
    values.push(description);
  }
  if (status) {
    fields.push("status = ?");
    values.push(status);
  }
  if (priority) {
    fields.push("priority = ?");
    values.push(priority);
  }

  values.push(id);

  try {
    await db.query(
      `UPDATE tasks SET ${fields.join(", ")} WHERE id = ?`,
      values,
    );
    const [rows]: any = await db.query("SELECT * FROM tasks WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE task
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    res.json({ message: `Tarefa ${id} deletada com sucesso!` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta 3300");
});
