import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB(); // lambda function, its going to die once it done with its job

    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create prompt.", { status: 500 });
  }
};
