import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type DiagnosticRequestBody = {
  company: {
    name: string;
    industry?: string;
    contactName?: string;
    contactEmail?: string;
  };
  answers: Record<string, string>;
  metadata?: Record<string, unknown>;
};

function cleanString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DiagnosticRequestBody;

    const companyName = cleanString(body.company?.name);
    const industry = cleanString(body.company?.industry);
    const contactName = cleanString(body.company?.contactName);
    const contactEmail = cleanString(body.company?.contactEmail);

    if (!companyName) {
      return NextResponse.json(
        { error: "El nombre de la empresa es obligatorio." },
        { status: 400 }
      );
    }

    if (!body.answers || typeof body.answers !== "object") {
      return NextResponse.json(
        { error: "Las respuestas del cuestionario son obligatorias." },
        { status: 400 }
      );
    }

    const answerEntries = Object.entries(body.answers)
      .map(([questionId, value]) => ({
        questionId,
        value: cleanString(value),
      }))
      .filter((answer) => answer.questionId && answer.value);

    if (answerEntries.length === 0) {
      return NextResponse.json(
        { error: "No se recibieron respuestas válidas." },
        { status: 400 }
      );
    }

    const existingQuestions = await prisma.question.findMany({
      where: {
        id: {
          in: answerEntries.map((answer) => answer.questionId),
        },
      },
      select: {
        id: true,
      },
    });

    const validQuestionIds = new Set(
      existingQuestions.map((question) => question.id)
    );

    const validAnswers = answerEntries.filter((answer) =>
      validQuestionIds.has(answer.questionId)
    );

    if (validAnswers.length === 0) {
      return NextResponse.json(
        { error: "Las respuestas no coinciden con el catálogo de preguntas." },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName,
          industry: industry || null,
          contactName: contactName || null,
          contactEmail: contactEmail || null,
        },
      });

      const diagnostic = await tx.diagnostic.create({
        data: {
          companyId: company.id,
          status: "PENDING",
          questionnaireVersion: "AXISSCAN_V1",
        },
      });

      await tx.answer.createMany({
        data: validAnswers.map((answer) => ({
          diagnosticId: diagnostic.id,
          questionId: answer.questionId,
          value: answer.value,
        })),
      });

      return {
        companyId: company.id,
        diagnosticId: diagnostic.id,
        answersSaved: validAnswers.length,
      };
    });

    return NextResponse.json({
      ok: true,
      message: "Diagnóstico recibido correctamente.",
      diagnosticId: result.diagnosticId,
      answersSaved: result.answersSaved,
    });
  } catch (error) {
    console.error("CREATE_DIAGNOSTIC_ERROR", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "No se pudo guardar el diagnóstico.",
      },
      { status: 500 }
    );
  }
}