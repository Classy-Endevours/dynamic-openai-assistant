// models/User.ts
import mongoose, { Document, Model, Schema } from "mongoose";

// Define the TypeScript interface for the User
export interface IUser extends Document {
  name: string;
  createdAt: Date;
  threadId: string;
  assistantId: string;
}

// Create the schema for the User model
const UserSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  threadId: String,
  assistantId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model and check if it already exists to avoid overwriting
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
