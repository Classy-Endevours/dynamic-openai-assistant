import { NextRequest, NextResponse } from "next/server";
import { OpenAIAssistant } from "@/lib/openai";
import Thread from "@/models/Threads";
import connectDB from "@/app/lib/db";
import OpenAI from "openai";
export const assistants = ["asst_X6Xp1GZxWu2eQrR8GKUnzQrn"];
const API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ threadId: string }>;
  }
) {
  try {
    // const { threadId } = await params;
    const { threadId } = await params;

    const myThread = await openai.beta.threads.retrieve(threadId);
    if (!myThread) {
      return NextResponse.json(
        { message: "Thread not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ thread: myThread }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
export async function POST() {
  try {
    await connectDB();

    const OpenAIAssistantInstance = new OpenAIAssistant(API_KEY);
    const newThreadId = await OpenAIAssistantInstance.createThread();
    const thread = new Thread({ threadId: newThreadId });
    await thread.save();

    return NextResponse.json({ thread }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
