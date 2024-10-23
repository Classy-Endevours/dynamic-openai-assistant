import { NextRequest, NextResponse } from "next/server";
import { OpenAIAssistant } from "@/lib/openai";
import connectDB from "@/app/lib/db";
import Assistant from "@/models/Assistants";
import OpenAI from "openai";
const openai = new OpenAI();
const API_KEY = process.env.OPENAI_API_KEY || "";

export async function GET() {
  try {
    // const body = await req.json();

    const myAssistants = await openai.beta.assistants.list({
      order: "desc",
      limit: 20,
    });

    return NextResponse.json({ myAssistants }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, instructions, tools, model } = body;

    await connectDB();
    const newAssistant = new OpenAIAssistant(API_KEY);
    const assistant = await newAssistant.createAssistant(
      name,
      instructions,
      tools,
      model
    );

    await Assistant.create(assistant);

    return NextResponse.json({ assistant }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
