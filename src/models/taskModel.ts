import mongoose from "mongoose";
import { ITask } from "./task.types";

const taskSchema = new mongoose.Schema<ITask>({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
}, { timestamps: true });

export const Task = mongoose.model<ITask>('Task', taskSchema);