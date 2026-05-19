import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "@/lib/prisma";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

function extractJson(raw: string) {
  const trimmed = raw.trim();
  const start = trimmed.indexOf("{");
  const end = trimmed.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Claude response did not contain valid JSON.");
  }

  return JSON.parse(trimmed.slice(start, end + 1));
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const diagnostic = await prisma.diagnostic.findUnique({
      where: { id },
      include: {
        company: true,
        answers: {
          include: {
            question: true,
          },
          orderBy: {
            question: {
              order: "asc",
            },
          },
        },
      },
    });

    if (!diagnostic) {
      return Response.json(
        { success: false, error: "Diagnostic not found" },
        { status: 404 }
      );
    }

    await prisma.diagnostic.update({
      where: { id },
      data: { status: "PROCESSING" },
    });

    const projectData = {
      company: diagnostic.company,
      diagnostic: {
        id: diagnostic.id,
        createdAt: diagnostic.createdAt,
        questionnaireVersion: diagnostic.questionnaireVersion,
      },
      answers: diagnostic.answers.map((answer) => ({
        block: answer.question.block,
        questionId: answer.question.id,
        question: answer.question.title,
        inputType: answer.question.inputType,
        isBaseline: answer.question.isBaseline,
        value: answer.value,
      })),
    };

    const prompt = `Eres un analista senior de inteligencia comercial y diagnóstico empresarial.

Tu trabajo es generar un análisis interno AXISSCAN™️ usando exclusivamente las respuestas del cuestionario.

NO escribas como chatbot.
NO uses relleno.
NO des recomendaciones genéricas como "mejorar redes sociales" o "hacer más marketing" salvo que expliques una acción específica, medible y conectada a las respuestas.

REGLA CRÍTICA — EPISTEMOLOGÍA DEL ANÁLISIS:
Antes de incluir cualquier afirmación, clasifícala internamente y etiquétala en el output:
- HECHO: dato confirmado directamente por el cuestionario
- INFERENCIA: conclusión lógica derivada de múltiples hechos
- HIPÓTESIS: posibilidad razonable no confirmada por datos
- PROYECCIÓN: estimación numérica basada en supuestos explícitos

Nunca presentes proyecciones numéricas como hechos. Si estimas "4 a 7 clientes", escribe: [PROYECCIÓN con supuesto: X% de conversión sobre base de Y clientes].

Debes detectar y analizar:
- tensión principal del negocio
- contradicciones entre métricas, operación, ventas, precios, clientes y visión
- riesgos ocultos
- oportunidades no obvias
- palancas comerciales de alto impacto
- acciones de 30 y 90 días
- fragilidad operativa real
- capacidad máxima absorbible con estructura actual
- costo económico de no resolver cada problema identificado

Responde SIEMPRE en español.
Devuelve ÚNICAMENTE JSON válido, sin markdown, sin backticks y sin explicación adicional.

Estructura exacta:
{
  "executive_summary": "máximo 120 palabras",

  "strategic_verdict": "máximo 90 palabras",

  "main_tension": {
    "title": "string",
    "explanation": "máximo 80 palabras — incluye etiqueta HECHO/INFERENCIA donde aplique",
    "business_impact": "máximo 60 palabras"
  },

  "highest_value_move": {
    "title": "string",
    "why_this_move": "máximo 80 palabras",
    "first_action": "máximo 50 palabras",
    "expected_result": "máximo 50 palabras — etiqueta PROYECCIÓN si incluye números con supuesto explícito"
  },

  "fragility_index": {
    "score": "número del 1 al 10 donde 10 es máxima fragilidad",
    "label": "Crítica / Alta / Media / Baja",
    "factors": [
      {
        "factor": "nombre del factor de fragilidad",
        "severity": "Critical / High / Medium / Low",
        "evidence": "evidencia directa del cuestionario que sustenta este factor"
      }
    ],
    "summary": "máximo 60 palabras explicando el perfil de fragilidad general del negocio"
  },

  "capacity_ceiling": {
    "estimated_max_revenue": "ingreso máximo mensual estimado que la estructura actual puede absorber sin colapso operativo",
    "bottleneck": "el factor específico que impondría ese techo primero",
    "reasoning": "máximo 70 palabras explicando el cálculo — etiqueta INFERENCIA o PROYECCIÓN",
    "what_breaks_first": "qué área o proceso colapsaría primero si el negocio intenta crecer más allá del techo estimado"
  },

  "cost_of_inaction": {
    "monthly_cost": "estimación del costo mensual de NO resolver el problema principal — puede ser en ingresos no capturados, horas perdidas, margen destruido",
    "12_month_projection": "proyección del costo acumulado a 12 meses si no se actúa — etiqueta PROYECCIÓN con supuesto explícito",
    "opportunity_cost": "qué posición competitiva o activo se pierde cada mes de inacción",
    "urgency_verdict": "Inmediata / Alta / Media / Baja — con justificación de máximo 40 palabras"
  },

  "priority_actions": {
    "next_30_days": [
      { "action": "string", "reason": "string", "expected_impact": "string — etiqueta PROYECCIÓN si hay números" },
      { "action": "string", "reason": "string", "expected_impact": "string" },
      { "action": "string", "reason": "string", "expected_impact": "string" }
    ],
    "next_90_days": [
      { "action": "string", "reason": "string", "expected_impact": "string" },
      { "action": "string", "reason": "string", "expected_impact": "string" },
      { "action": "string", "reason": "string", "expected_impact": "string" }
    ],
    "critical_metric": {
      "name": "string",
      "why_it_matters": "string",
      "how_to_track": "string"
    }
  },

  "opportunities": [
    {
      "title": "string",
      "insight": "string — etiqueta HECHO/INFERENCIA/HIPÓTESIS según corresponda",
      "recommended_action": "string",
      "risk_if_ignored": "string"
    },
    {
      "title": "string",
      "insight": "string",
      "recommended_action": "string",
      "risk_if_ignored": "string"
    },
    {
      "title": "string",
      "insight": "string",
      "recommended_action": "string",
      "risk_if_ignored": "string"
    }
  ],

  "risks": [
    {
      "title": "string",
      "severity": "Critical / High / Medium / Low",
      "why_it_matters": "string",
      "mitigation": "string",
      "cost_if_ignored": "estimación del costo si este riesgo se materializa"
    },
    {
      "title": "string",
      "severity": "Critical / High / Medium / Low",
      "why_it_matters": "string",
      "mitigation": "string",
      "cost_if_ignored": "string"
    },
    {
      "title": "string",
      "severity": "Critical / High / Medium / Low",
      "why_it_matters": "string",
      "mitigation": "string",
      "cost_if_ignored": "string"
    }
  ]
}

DATA:
${JSON.stringify(projectData, null, 2)}
`;

    const completion = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 5000,
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = completion.content[0];

    if (rawText.type !== "text") {
      throw new Error("Unexpected response type");
    }

    const parsed = extractJson(rawText.text);

    await prisma.aiAnalysis.upsert({
      where: { diagnosticId: diagnostic.id },
      update: {
        executiveSummary: parsed.executive_summary ?? null,
        strategicVerdict: parsed.strategic_verdict ?? null,
        rawResponse: parsed,
      },
      create: {
        diagnosticId: diagnostic.id,
        executiveSummary: parsed.executive_summary ?? null,
        strategicVerdict: parsed.strategic_verdict ?? null,
        rawResponse: parsed,
      },
    });

    await prisma.diagnostic.update({
      where: { id },
      data: { status: "COMPLETED" },
    });

    return Response.json({ success: true, analysis: parsed });
  } catch (error) {
    console.error("INTERNAL_ANALYZE_ERROR", error);

    return Response.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Internal analysis failed",
      },
      { status: 500 }
    );
  }
}
