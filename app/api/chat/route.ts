import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { increaseAPILimit, checkLimit } from "@/lib/api-limit";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key is missing.", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required.", { status: 400 });
    }

    const isFreeTrial = await checkLimit();

    if (!isFreeTrial) {
      return new NextResponse("You've reached the free trial usage limit.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages
    });

    await increaseAPILimit();

    return NextResponse.json(response.choices[0].message);
  } catch (e) {
    console.log("error:", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
