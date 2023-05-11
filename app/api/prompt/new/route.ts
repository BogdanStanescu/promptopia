import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
  const { userId, title, tag } = await request.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({ creator: userId, title, tag });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
