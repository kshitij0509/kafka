const express = require("express");
const dbConnect = require("./config/database");
const kafkaRoutes = require("./routes/kafkaRoutes");
const app = express();
const { consumeMessages } = require("./services/kafkaConsumers");
const { publish_data } = require("./services/kafkaProducers");

app.use(express.json());
app.use("/kafka", kafkaRoutes);

dbConnect();
consumeMessages("fake_data");
publish_data(10);

app.get("/", (req, res) => {
  res.send("hello kafka ");
});
app.listen(3000, () => {
  console.log(
    "...........................server running on port 3000................"
  );
});
