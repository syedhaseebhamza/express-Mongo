import dotenv from "dotenv";
import users from "./MOCK_DATA (1).json" assert { type: "json" };
import collection from "./models/collection.js";
import connectDB from "./db/conntect.js";

dotenv.config();

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_DEV_URI);
    await collection.create(users);
    console.log("success");
  } catch (error) {
    console.log("error", error);
  }
};

start();

// in this file i send data to mongoDB 