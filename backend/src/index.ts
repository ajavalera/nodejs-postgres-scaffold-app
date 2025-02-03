import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
const port = 3000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Routes
app.get("/api/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/todos", async (req, res) => {
  const { title, completed } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title, completed) VALUES ($1, $2) RETURNING *",
      [title, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
