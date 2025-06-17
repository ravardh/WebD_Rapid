import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("Server connected");
  res.json({ message: "Hello, i am backend" });
});

app.post("/login/user", (req, res) => {
  res.json({ message: "Hello, i am user Login" });
});

app.post("/login/admin", (req, res) => {
  res.json({ message: "Hello, i am admin Login" });
});

app.get("/logout", (req, res) => {
  res.json({ message: "Hello, i am logout" });
});

app.post("/register", (req, res) => {
  res.json({ message: "Hello, i am register" });
});

app.put("/update", (req, res) => {
  res.json({ message: "Hello, i am update" });
});

app.delete("/delete", (req, res) => {
  res.json({ message: "Hello, i am delete" });
});

app.listen(5000, () => {
  console.log("Server Started");
});
