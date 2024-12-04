const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// Mock Database
const users = [{ username: "user@example.com", password: "password123" }];

app.use(bodyParser.json());

app.post("/validate-login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
