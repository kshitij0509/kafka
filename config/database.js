const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/kafka");
    console.log(
      "...................................mongodb connected ................................"
    );
  } catch (error) {
    console.error(error);
    console.log(
      "..............>>>>>>>>>>>>>>>>>>>>>>>>>facing problem while connecting to the database<<<<<<<<<<<<<<<<<<<"
    );
  }
};

module.exports = dbConnect;
