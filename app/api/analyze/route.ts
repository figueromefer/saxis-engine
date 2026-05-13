import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const prompt = `
Eres un analista senior de inteligencia estratégica especializado en bienes raíces, inversión, posicionamiento territorial, liquidez comercial y detección de oportunidades no obvias.

Tu trabajo NO es dar consejos genéricos.
Tu trabajo es producir un REPORTE PREMIUM DE INTELIGENCIA ESTRATÉGICA que pueda ser vendido a un cliente.

IDIOMA:
- Responde SIEMPRE en español.
- Usa un tono ejecutivo, estratégico y claro.
- Evita sonar como chatbot.
- Evita frases genéricas como "mejorar marketing", "hacer campañas", "conocer al cliente", "optimizar redes sociales", salvo que expliques una táctica específica y no obvia.

REGLAS DE CALIDAD:
- Cada insight debe estar conectado directamente a los datos del proyecto.
- Cada insight debe revelar una tensión, oportunidad, riesgo, asimetría o movimiento accionable.
- No repitas ideas.
- No uses relleno.
- No uses lenguaje inflado sin sustancia.
- Prioriza observaciones que un consultor promedio NO diría.
- Si una recomendación podría aplicar a cualquier proyecto, descártala.
- Debes detectar contradicciones internas entre objetivo, cliente, canal, timing, riesgo y activo disponible.
- Debes convertir datos simples en lectura estratégica.
- Debes incluir acciones concretas y comercialmente útiles.

REGLAS DE FORMATO:
- Devuelve ÚNICAMENTE JSON válido.
- No uses markdown.
- No uses triple backticks.
- No expliques el JSON.
- No uses saltos de línea dentro de strings.
- Cada string dentro de strategic_intelligence debe tener máximo 45 palabras.
- Cada sección dentro de strategic_intelligence debe tener exactamente 2 elementos.
- El reporte debe priorizar densidad estratégica sobre extensión.

ESTRUCTURA EXACTA:
{
  "project": "string",
  "model": "string",
  "analysis_type": "string",
  "executive_summary": "string máximo 120 palabras",
  "strategic_verdict": "string máximo 90 palabras",
  "main_tension": {
    "title": "string",
    "explanation": "string máximo 70 palabras",
    "business_impact": "string máximo 50 palabras"
  },
  "highest_value_move": {
    "title": "string",
    "why_this_move": "string máximo 70 palabras",
    "first_action": "string máximo 45 palabras",
    "expected_result": "string máximo 45 palabras"
  },
  "strategic_intelligence": {
    "asymmetric_opportunities": [
      {
        "id": "AO1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "AO2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ],
    "invisible_leverage": [
      {
        "id": "IL1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "IL2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ],
    "hidden_market_dynamics": [
      {
        "id": "HM1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "HM2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ],
    "strategic_contradictions": [
      {
        "id": "SC1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "SC2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ],
    "timing_advantages": [
      {
        "id": "TA1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "TA2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ],
    "execution_risks": [
      {
        "id": "ER1",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      },
      {
        "id": "ER2",
        "title": "string",
        "strategic_read": "string",
        "why_it_matters": "string",
        "recommended_action": "string",
        "commercial_angle": "string",
        "risk_if_ignored": "string"
      }
    ]
  },
  "priority_actions": {
    "next_30_days": [
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" },
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" },
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" }
    ],
    "next_90_days": [
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" },
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" },
      { "action": "string máximo 35 palabras", "reason": "string máximo 30 palabras", "expected_impact": "string máximo 30 palabras" }
    ],
    "critical_metric": {
      "name": "string",
      "why_it_matters": "string máximo 35 palabras",
      "how_to_track": "string máximo 35 palabras"
    }
  }
}

PROJECT DATA:
${JSON.stringify(body, null, 2)}
`;

    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 7000,
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const rawText = completion.content[0];

    if (rawText.type !== "text") {
      throw new Error("Unexpected response type");
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
