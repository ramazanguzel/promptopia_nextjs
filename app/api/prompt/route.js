import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectToDB();
    // fix error related to db
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch", { status: 500 });
  }
};
