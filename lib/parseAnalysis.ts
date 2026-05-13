export function parseAnalysis(
  raw: string
) {

  try {

    const cleaned =
      raw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const firstBrace =
      cleaned.indexOf("{");

    const lastBrace =
      cleaned.lastIndexOf("}");

    if (
      firstBrace === -1 ||
      lastBrace === -1
    ) {
      throw new Error(
        "No JSON found"
      );
    }

    const jsonString =
      cleaned.slice(
        firstBrace,
        lastBrace + 1
      );

    return JSON.parse(jsonString);

  } catch (error) {

    console.error(
      "PARSE ERROR:",
      error
    );

    return null;
  }
}