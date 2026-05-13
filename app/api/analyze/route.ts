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

ESTRUCTURA OBLIGATORIA:
Devuelve ÚNICAMENTE JSON válido.
No uses markdown.
No uses triple backticks.
No expliques el JSON.

El JSON debe tener exactamente esta estructura:

{
  "project": "string",
  "model": "string",
  "analysis_type": "string",

  "executive_summary": "string de 120 a 180 palabras. Debe explicar la lectura estratégica general del proyecto.",

  "strategic_verdict": "string de 80 a 130 palabras. Debe decir con claridad si el proyecto está bien posicionado, mal posicionado o parcialmente desalineado, y por qué.",

  "main_tension": {
    "title": "string",
    "explanation": "string de 80 a 130 palabras",
    "business_impact": "string de 50 a 90 palabras"
  },

  "highest_value_move": {
    "title": "string",
    "why_this_move": "string de 80 a 130 palabras",
    "first_action": "string de 40 a 80 palabras",
    "expected_result": "string de 40 a 80 palabras"
  },

  "strategic_intelligence": {
    "asymmetric_opportunities": [
      {
        "id": "AO1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "AO2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ],

    "invisible_leverage": [
      {
        "id": "IL1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "IL2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ],

    "hidden_market_dynamics": [
      {
        "id": "HM1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "HM2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ],

    "strategic_contradictions": [
      {
        "id": "SC1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "SC2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ],

    "timing_advantages": [
      {
        "id": "TA1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "TA2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ],

    "execution_risks": [
      {
        "id": "ER1",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      },
      {
        "id": "ER2",
        "title": "string",
        "strategic_read": "string de 80 a 120 palabras",
        "why_it_matters": "string de 60 a 100 palabras",
        "recommended_action": "string de 50 a 90 palabras",
        "commercial_angle": "string de 40 a 80 palabras",
        "risk_if_ignored": "string de 40 a 80 palabras"
      }
    ]
  },

  "priority_actions": {
    "next_30_days": [
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      },
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      },
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      }
    ],
    "next_90_days": [
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      },
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      },
      {
        "action": "string",
        "reason": "string",
        "expected_impact": "string"
      }
    ],
    "critical_metric": {
      "name": "string",
      "why_it_matters": "string",
      "how_to_track": "string"
    }
  }
}

PROJECT DATA:
${JSON.stringify(body, null, 2)}
`;

    const completion =
      await anthropic.messages.create({
        model: "claude-sonnet-4-6",

        max_tokens: 12000,

        temperature: 0.35,

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