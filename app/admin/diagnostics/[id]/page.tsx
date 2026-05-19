import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GenerateAnalysisButton from "@/components/GenerateAnalysisButton";
import AdminAnalysisReport from "@/components/AdminAnalysisReport";

export const dynamic = "force-dynamic";

export default async function DiagnosticDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const diagnostic = await prisma.diagnostic.findUnique({
    where: {
      id,
    },
    include: {
      company: true,
      analysis: true,
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
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#080c0f] text-[#d4cfc8] px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-4">
            Diagnóstico interno
          </p>
          <h1 className="text-4xl text-white mb-4">
            {diagnostic.company.name}
          </h1>
          <p className="text-zinc-500 mb-4">
            {diagnostic.createdAt.toLocaleString("es-MX")}
          </p>

          <div className="inline-flex border border-[#26333a] rounded-full px-4 py-2 text-sm text-[#c8a96e]">
            Estado: {diagnostic.status}
          </div>
        </div>

        {!diagnostic.analysis && (
          <GenerateAnalysisButton diagnosticId={diagnostic.id} />
        )}

        {diagnostic.analysis?.rawResponse && (
          <AdminAnalysisReport
            analysis={diagnostic.analysis.rawResponse}
          />
        )}

        <div className="space-y-6">
          {diagnostic.answers.map((answer) => (
            <article
              key={answer.id}
              className="border border-[#26333a] bg-[#0e1419] rounded-3xl p-6"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#c8a96e] mb-4">
                {answer.question.block}
              </p>

              <h2 className="text-xl text-white mb-4">
                {answer.question.title}
              </h2>

              <p className="text-zinc-300 whitespace-pre-wrap leading-7">
                {answer.value}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
