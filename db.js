import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // XAMPP default user
  password: "",      // leave empty unless you set one
  database: "chie_inventory",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL Database");
  }
});

export default db;
