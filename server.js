const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());

const HTTP_PORT = 8000;

app.get("/data", (req, res) => {
  const data = fs.readFileSync(__dirname + "/data.json", "utf-8");
  res.json(data);
});

app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`));
