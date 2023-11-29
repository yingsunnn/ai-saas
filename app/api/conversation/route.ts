import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

export async function POST(req: Request) {
  if (!apiKey) {
    throw Error("OpenAI key doesn't exist.");
  }

  const openai = new OpenAI({ apiKey });
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    console.log("sending messages: ", messages);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });

    console.log("openai response: ", JSON.stringify(response));

    return NextResponse.json("test message.")
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
