import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function GET() {
  try {

    const response = await fetch(
      "https://api.anthropic.com/v1/models",
      {
        headers: {
          "x-api-key":
            process.env.ANTHROPIC_API_KEY!,
          "anthropic-version":
            "2023-06-01",
        },
      }
    );

    const data = await response.json();

    return Response.json(data);

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
    });
  }
}