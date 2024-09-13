const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectedBD = await mongoose.connect(
      "mongodb+srv://tanquanga6k10:CpdAVLjkbtX5chAq@shopdientu.l5fgtvm.mongodb.net/shopdientu?retryWrites=true&w=majoritySECRET_KEY=t_viral",
      {
        dbName: "t_viral",
      }
    );
    if (!connectedBD) {
      console.log("Couldn't connect to MongoDB");
    } else {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
