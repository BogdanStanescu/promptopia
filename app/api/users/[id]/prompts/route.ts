import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (params: { id: string }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({ user: params.id }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to retrieve prompt list", { status: 500 });
  }
};
