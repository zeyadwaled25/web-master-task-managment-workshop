import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: false,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
      required: [true, "Priority is required"],
    },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Done", "Cancelled"],
      default: "todo",
      required: [true, "Status is required"],
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
