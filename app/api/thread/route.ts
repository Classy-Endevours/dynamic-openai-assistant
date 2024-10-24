import { NextResponse } from "next/server";
import { OpenAIAssistant } from "@/lib/openai";
import Thread from "@/models/Threads";
import connectDB from "@/app/lib/db";
export const assistants = ["asst_X6Xp1GZxWu2eQrR8GKUnzQrn"];
const API_KEY = process.env.OPENAI_API_KEY || "";

export async function GET( ) {
  try {
    await connectDB();
    const threads = await Thread.find()
    return NextResponse.json(threads, { status: 200 });
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
