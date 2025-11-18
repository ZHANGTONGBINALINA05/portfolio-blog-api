const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.green);
  } catch (error) {
    console.error(`MongoDB连接错误: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;