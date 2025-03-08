const { produceMessage } = require("../services/kafkaProducers");

const sendKafkaMessage = async (req, res) => {
  const { message, topic } = req.body;
  try {
    await produceMessage(topic, message);
    res.json({ status: "Message sent successfully", message });
  } catch (error) {
    console.error("Error sending Kafka message:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { sendKafkaMessage };
