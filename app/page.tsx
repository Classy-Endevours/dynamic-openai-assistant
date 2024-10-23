"use client";

import axios from "axios";
import { AssistantTool } from "openai/resources/beta/assistants.mjs";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [tools, setTools] = useState<AssistantTool[]>([]);
  const [model, setModel] = useState<string>("gpt-4o"); // Default to gpt-4
  const [darkMode, setDarkMode] = useState<boolean>(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    try {
      const response = await axios.post("/api/users", {
        name,
        instructions,
        tools,
        model,
      });
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-[60%] mt-24 p-6 bg-white rounded-lg shadow-md ${
          darkMode ? "dark:bg-gray-800" : ""
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create AI Assistant</h2>
          <button onClick={toggleDarkMode} className="text-sm font-semibold">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
            />
          </div>

          <div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
              rows={4}
            />
          </div>

          <div>
            <label
              htmlFor="tools"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tools
            </label>
            <select
              id="tools"
              value={JSON.stringify(tools)}
              onChange={(e) => setTools(JSON.parse(e.target.value))}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
            >
              <option value="">Select tools</option>
              {/* Example options; replace with dynamic options as needed */}
              <option value={JSON.stringify([{ type: "code_interpreter" }])}>
                code_interpreter
              </option>
              <option value={JSON.stringify([{ type: "file_search" }])}>
                file_search
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="model"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Model
            </label>
            <select
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
              className={`mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200`}
            >
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4o mini">gpt-4o mini</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
