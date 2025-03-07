const mongoose = require("mongoose");

const kafkaMessageSchema = new mongoose.Schema({
  topic: String,
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("KafkaMessage", kafkaMessageSchema);
