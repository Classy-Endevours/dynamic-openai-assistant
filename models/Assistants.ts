// models/User.ts
import mongoose, { Schema } from "mongoose";

// Define the TypeScript interface for the User
// export interface IAssistant extends Document {
//   assistantId: string;
// }

interface AssistantTool {
  type: string; // You can specify more types if needed
}

interface ToolResources {
  file_search: {
    vector_store_ids: string[]; // Assuming these are strings, change type if needed
  };
}

interface IAssistant {
  id: string;
  object: string;
  created_at: number; // Unix timestamp
  name: string;
  description: string | null; // Can be a string or null
  model: string; // Assuming model names are strings
  instructions: string;
  tools: AssistantTool[];
  tool_resources: ToolResources;
  metadata: Record<string, unknown>; // Can be further specified if you know the structure
  top_p: number;
  temperature: number;
  response_format: string; // Assuming response formats are strings
}

const AssistantToolSchema = new mongoose.Schema({
  type: { type: String, required: true },
});

const ToolResourcesSchema = new mongoose.Schema({
  file_search: {
    vector_store_ids: { type: [String], default: [] }, // Array of strings
  },
});

// Create the schema for the User model
const AssistantSchema: Schema<IAssistant> = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    object: { type: String, required: true },
    created_at: { type: Number, required: true }, // Unix timestamp
    name: { type: String, required: true },
    description: { type: String, default: null }, // Can be null
    model: { type: String, required: true },
    instructions: { type: String, required: true },
    tools: { type: [AssistantToolSchema], required: true },
    tool_resources: { type: ToolResourcesSchema, required: true },
    metadata: { type: Object, default: {} }, // Generic object
    top_p: { type: Number, required: true },
    temperature: { type: Number, required: true },
    response_format: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Export the model and check if it already exists to avoid overwriting
const Assistant = mongoose.model("Assistant", AssistantSchema);
export default Assistant;
