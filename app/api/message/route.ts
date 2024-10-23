import { OpenAIAssistant } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.OPENAI_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    //   await connectDB();
    const { threadId, question, assistantId } = await req.json();
    const openAIAssistantInstance = new OpenAIAssistant(API_KEY);
    const messages = await openAIAssistantInstance.createMessage(
      question,
      threadId,
      assistantId,
      false
    );
    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
