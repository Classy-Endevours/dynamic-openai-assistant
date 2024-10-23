// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

// Define the TypeScript interface for the User
export interface IThreads extends Document {
  threadId: string;
}

// Create the schema for the User model
const ThreadsSchema: Schema<IThreads> = new mongoose.Schema(
  {
    threadId: String,
  },
  {
    timestamps: true,
  }
);

// Export the model and check if it already exists to avoid overwriting
const Thread: Model<IThreads> =
  mongoose.models.Thread || mongoose.model<IThreads>("Thread", ThreadsSchema);
export default Thread;
