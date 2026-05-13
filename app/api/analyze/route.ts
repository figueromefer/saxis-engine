import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  try {

    const body = await req.json();

    const prompt = `
You are an elite strategic intelligence analyst.

Your role is to identify:
- asymmetric opportunities
- invisible leverage
- hidden market dynamics
- strategic contradictions
- timing advantages
- territorial positioning
- execution risks
- narrative gaps

IMPORTANT RULES:

- Avoid generic business advice.
- Avoid superficial recommendations.
- Avoid obvious marketing suggestions.
- Every insight must be highly specific to the provided context.
- Prioritize non-obvious observations.
- Detect hidden leverage and strategic asymmetry.

Return ONLY valid JSON.

Return compact JSON.
Do not include markdown formatting.
Do not include triple backticks.
Do not explain the JSON.

PROJECT DATA:
${JSON.stringify(body, null, 2)}
`;

    const completion =
      await anthropic.messages.create({
        model: "claude-sonnet-4-6",

        max_tokens: 6000,

        temperature: 0.7,

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const rawText =
      completion.content[0];

    if (
      rawText.type !== "text"
    ) {
      throw new Error(
        "Unexpected response type"
      );
    }

    return Response.json({
      success: true,
      data: rawText.text,
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