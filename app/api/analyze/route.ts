import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const completion = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest",

      max_tokens: 1500,

      messages: [
        {
          role: "user",
          content: `
You are a strategic intelligence analyst.

Analyze this project deeply.

Focus on:
- visible opportunities
- hidden opportunities
- asymmetric advantages
- execution risks
- timing
- leverage
- strategic positioning

PROJECT DATA:
${JSON.stringify(body, null, 2)}
          `,
        },
      ],
    });

    const response =
      completion.content[0];

    return Response.json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}