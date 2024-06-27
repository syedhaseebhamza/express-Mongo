import mongoose from "mongoose";

const collectionScheme = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: { type: String },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  job_title: { type: String, required: true },
});
const collection = mongoose.model("collection", collectionScheme);
export default collection;
// in this file i create a schema for my data 