const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "express-app",
  brokers: ["localhost:9092", "localhost:9094", "localhost:9096"], // Kafka broker in KRaft mode
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

const publish_data = (second) => {
  setInterval(() => {
    let message = {
      plantname: "tulsi",
      ec: Math.floor(Math.random() * 3) + 1,
      ph: Math.floor(Math.random() * 6) + 1,
    };
    produceMessage("fake_data", JSON.stringify(message));
  }, second * 1000);
};

module.exports = { produceMessage, publish_data };
