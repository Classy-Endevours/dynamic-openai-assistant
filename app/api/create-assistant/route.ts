// import { NextRequest, NextResponse } from "next/server";
// import { OpenAIAssistant } from "@/lib/openai";

// const API_KEY = process.env.OPENAI_API_KEY || "";
// const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID || "";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     let { threadId } = body;
//     const { question } = body;

//     const openai = new OpenAIAssistant(API_KEY, ASSISTANT_ID, threadId);
//     if (!threadId) {
//       threadId = await openai.createThread();
//     }
//     const response = await openai.createMessage(question);

//     return NextResponse.json({ response, threadId }, { status: 200 });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: error instanceof Error ? error.message : "An error occurred" },
//       { status: 500 }
//     );
//   }
// }
