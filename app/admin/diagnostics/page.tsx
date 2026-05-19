import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDiagnosticsPage() {
  const diagnostics = await prisma.diagnostic.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      company: true,
      answers: {
        select: {
          id: true,
        },
      },
      analysis: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#080c0f] text-[#d4cfc8] px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-4">
            AXISSCAN™ Admin
          </p>
          <h1 className="text-4xl md:text-5xl text-white mb-4">
            Diagnósticos recibidos
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-7">
            Consulta cuestionarios enviados, respuestas capturadas y análisis internos generados.
          </p>
        </div>

        <div className="border border-[#26333a] bg-[#0e1419] rounded-3xl overflow-hidden">
          <div className="grid grid-cols-[1.3fr_1fr_120px_130px_160px] gap-4 px-6 py-4 border-b border-[#26333a] text-xs uppercase tracking-[0.2em] text-zinc-500">
            <div>Empresa</div>
            <div>Fecha</div>
            <div>Estado</div>
            <div>Respuestas</div>
            <div>Análisis</div>
          </div>

          {diagnostics.length === 0 && (
            <div className="px-6 py-12 text-zinc-500">
              Aún no hay diagnósticos recibidos.
            </div>
          )}

          {diagnostics.map((diagnostic) => (
            <Link
              key={diagnostic.id}
              href={`/admin/diagnostics/${diagnostic.id}`}
              className="grid grid-cols-[1.3fr_1fr_120px_130px_160px] gap-4 px-6 py-5 border-b border-[#1b252b] hover:bg-[#111a20] transition-colors"
            >
              <div>
                <p className="text-white font-medium">{diagnostic.company.name}</p>
                <p className="text-xs text-zinc-500 mt-1 break-all">{diagnostic.id}</p>
              </div>
              <div className="text-sm text-zinc-400">
                {diagnostic.createdAt.toLocaleString("es-MX")}
              </div>
              <div className="text-sm text-[#c8a96e]">{diagnostic.status}</div>
              <div className="text-sm text-zinc-300">{diagnostic.answers.length}</div>
              <div className="text-sm text-zinc-300">
                {diagnostic.analysis ? "Generado" : "Pendiente"}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
