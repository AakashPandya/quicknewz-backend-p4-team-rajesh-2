import mongoose from "mongoose";
const { model, Schema } = mongoose;

const headlinesSchema = new Schema({
  _id: { type: Number },
  title: { type: String, unique: true },
  link: { type: String, unique: true },
  imageLink: { type: String },
  provider: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const headlinesModel = model("Headlines", headlinesSchema);

export default headlinesModel;
