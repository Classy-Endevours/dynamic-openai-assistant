import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
export const assistants = ["asst_X6Xp1GZxWu2eQrR8GKUnzQrn"];

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
    req.json();
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
