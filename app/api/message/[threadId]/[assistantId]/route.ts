import { OpenAIAssistant } from "@/lib/openai";
import { NextRequest, NextResponse } from "next/server";
const API_KEY = process.env.OPENAI_API_KEY || "";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ messageId: string; assistantId: string }>;
  }
) {
  try {
    //   await connectDB();
    const { messageId, assistantId } = await params;
    const openAIAssistantInstance = new OpenAIAssistant(API_KEY);
    const messages = await openAIAssistantInstance.createRun(
      messageId,
      assistantId
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
