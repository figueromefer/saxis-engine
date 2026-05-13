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
- Think like a hybrid of:
  - strategic consultant
  - intelligence analyst
  - venture analyst
  - territorial strategist

Return ONLY valid JSON.

Use this exact structure:

{
  "executiveSummary": "string",

  "strategicDiagnosis": "string",

  "visibleOpportunities": [
    {
      "title": "string",
      "whyItMatters": "string",
      "action": "string"
    }
  ],

  "hiddenOpportunities": [
    {
      "title": "string",
      "whyItMatters": "string",
      "action": "string"
    }
  ],

  "hiddenRisks": [
    {
      "title": "string",
      "whyItIsDangerous": "string",
      "mitigation": "string"
    }
  ],

  "axisSequence": [
    {
      "step": 1,
      "action": "string",
      "reason": "string"
    }
  ],

  "scores": [
    {
      "dimension": "Timing",
      "score": 0,
      "reason": "string"
    }
  ],

  "finalVerdict": "string"
}

PROJECT DATA:
${JSON.stringify(body, null, 2)}
`;

    const completion =
      await anthropic.messages.create({
        model: "claude-3-7-sonnet",

        max_tokens: 2500,

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

    const parsed =
      JSON.parse(rawText.text);

    return Response.json({
      success: true,
      data: parsed,
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