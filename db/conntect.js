import mongoose from "mongoose";

const uri =
  "mongodb+srv://syedhaseebhamza333:cFNbv8FnWq1kPr3F@cluster0.1jzc8po.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

export default connectDB;
