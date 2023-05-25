import mongoose from "mongoose";
const schema = new mongoose.Schema({
  title: {
    type: String,
    trim: true, 
    required: "This is required",
  },
  description: {
    type: String,
    trim: true,
    required: "This is required",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Task = mongoose.model("Task", schema);
