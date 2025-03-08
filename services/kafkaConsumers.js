const { Kafka } = require("kafkajs");
const KafkaMessage = require("../model/message");

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092", "localhost:9094", "localhost:9096"],
});

const consumer = kafka.consumer({ groupId: "express-group" });

const consumeMessages = async (topic) => {
  try {
    await consumer.connect();
    console.log("Kafka Consumer Connected");

    await consumer.subscribe({ topic, fromBeginning: false });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
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
