import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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
      <section className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-4">
            Diagnóstico interno
          </p>
          <h1 className="text-4xl text-white mb-4">
            {diagnostic.company.name}
          </h1>
          <p className="text-zinc-500">
            {diagnostic.createdAt.toLocaleString("es-MX")}
          </p>
        </div>

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
