// const OpenAI = require('openai')

import OpenAI from "openai";
import { AssistantTool } from "openai/resources/beta/assistants.mjs";

export interface Assistant {
  id: string;
  object: string;
  createdAt: number;
  name: string;
  description: string | null;
  model: string;
  instructions: string;
  tools: Tool[];
  metadata: Record<string, unknown>;
  topP: number;
  temperature: number;
  responseFormat: string;
}

interface Tool {
  type: string;
}

export class OpenAIAssistant {
  openai: OpenAI;
  threadId: string | undefined;

  constructor(secretKey: string) {
    this.openai = new OpenAI({
      apiKey: secretKey,
    });
  }
  async createAssistant(
    name: string,
    instructions: string,
    tools: AssistantTool[],
    model: string
  ) {
    const assistant = await this.openai.beta.assistants.create({
      name,
      instructions,
      tools,
      model,
    });

    return assistant;
  }
  async createThread() {
    const thread = await this.openai.beta.threads.create();
    this.threadId = thread.id;
    return this.threadId;
  }

  async createMessage(question: string) {
    if (!this.threadId) throw new Error("Please specify a thread");
    await this.openai.beta.threads.messages.create(this.threadId, {
      role: "user",
      content: question,
    });
    return this.createRun();
  }

  async createRun() {
    if (!this.threadId) throw new Error("Please specify a thread");
    const run = await this.openai.beta.threads.runs.create(this.threadId, {
      //   assistant_id: this.assistantId,
      assistant_id: "",
    });
    let runStatus = await this.openai.beta.threads.runs.retrieve(
      this.threadId,
      run.id
    );

    // Polling mechanism to see if runStatus is completed
    // This should be made more robust.
    while (runStatus.status !== "completed") {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      runStatus = await this.openai.beta.threads.runs.retrieve(
        this.threadId,
        run.id
      );
    }
    // Get the last assistant message from the messages array
    const messages = await this.openai.beta.threads.messages.list(
      this.threadId
    );

    // Find the last message for the current run
    const lastMessageForRun = messages.data
      .filter(
        (message) => message.run_id === run.id && message.role === "assistant"
      )
      .pop();

    return lastMessageForRun;
  }
}
