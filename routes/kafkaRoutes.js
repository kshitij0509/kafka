const express = require("express");
const router = express.Router();
const { sendKafkaMessage } = require("../controllers/kafkaController");
const { consumeMessages } = require("../services/kafkaConsumers");

router.post("/", sendKafkaMessage);

module.exports = router;
