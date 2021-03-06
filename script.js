const express = require("express");
const pool = require("./db");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "static")));
app.use(express.json());

// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//     method: ["GET", "POST"],
//     credentials: true,
//   })
// );

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/post-body/", async (req, res) => {
  const { background, leftSide, lowerCircle, upperCircle } = req.body;
  await pool.query(
    "INSERT INTO bodyparts (background,left_side,lower_circle,upper_circle) VALUES ($1, $2, $3, $4)",
    [background, leftSide, lowerCircle, upperCircle],
    (err, result) => {
      if (!result) res.json({ err: err });
      else res.json({ result: result });
    }
  );
});

app.get("/get-all-bodies/", async (req, res) => {
  await pool.query(
    "SELECT id,background,left_side,lower_circle,upper_circle FROM bodyparts ORDER BY created_at DESC",
    (err, result) => {
      res.json({ result: result.rows });
    }
  );
});

app.listen(3001, () => {
  console.log("Server is running");
});
