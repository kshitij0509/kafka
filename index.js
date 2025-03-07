const express = require("express");
const dbConnect = require("./config/database");
const app = express();
dbConnect();

app.get("/", (req, res) => {
  res.send("hello kafka ");
});
app.listen(3000, () => {
  console.log(
    "...........................server running on port 3000................"
  );
});
