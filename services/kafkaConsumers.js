const { Kafka } = require("kafkajs");
const KafkaMessage = require("../models/KafkaMessage");

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "express-group" });

const consumeMessages = async (topic) => {
  try {
    await consumer.connect();
    console.log("Kafka Consumer Connected");

    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const msg = message.value.toString();
        console.log(`Received message from topic "${topic}":`, msg);

        // Save message in MongoDB
        await KafkaMessage.create({ topic, message: msg });
        console.log(" Message saved to MongoDB");
      },
    });
  } catch (error) {
    console.log(" Message saved to MongoDB");
    console.error("Kafka Consumer Error:", error);
  }
};

module.exports = { consumeMessages };
