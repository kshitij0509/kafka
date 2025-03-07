const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092"], // Kafka broker in KRaft mode
});

const producer = kafka.producer();

const produceMessage = async (topic, message) => {
  try {
    await producer.connect();
    console.log("Kafka Producer Connected");

    await producer.send({
      topic,
      messages: [{ value: message }],
    });

    console.log(`Sent message to topic "${topic}":`, message);
    await producer.disconnect();
  } catch (error) {
    console.error("Kafka Producer Error:", error);
  }
};

module.exports = { produceMessage };
