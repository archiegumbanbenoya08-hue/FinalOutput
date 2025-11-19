import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import db from "./db.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get all items
app.get("/api/items", (req, res) => {
  db.query("SELECT * FROM items", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add item
app.post("/api/items", (req, res) => {
  const { name, quantity, price, category } = req.body;
  db.query(
    "INSERT INTO items (name, quantity, price, category) VALUES (?, ?, ?, ?)",
    [name, quantity, price, category],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Item added successfully!" });
    }
  );
});

// Update item
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, category } = req.body;
  db.query(
    "UPDATE items SET name=?, quantity=?, price=?, category=? WHERE id=?",
    [name, quantity, price, category, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Item updated successfully!" });
    }
  );
});

// Delete item
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM items WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Item deleted successfully!" });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
