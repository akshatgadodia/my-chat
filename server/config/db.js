import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const DB = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.tx2hfyq.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB);
    console.log("Connection to MongoDB database successful");
  } catch (error) {
    console.log("Connection to MongoDB database failed");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
