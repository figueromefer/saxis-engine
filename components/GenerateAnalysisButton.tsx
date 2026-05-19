"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GenerateAnalysisButtonProps = {
  diagnosticId: string;
};

export default function GenerateAnalysisButton({
  diagnosticId,
}: GenerateAnalysisButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/diagnostics/${diagnosticId}/analyze`, {
        method: "POST",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "No se pudo generar el análisis.");
      }

      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No se pudo generar el análisis."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="border border-[#26333a] bg-[#0e1419] rounded-3xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#c8a96e] mb-3">
            Análisis interno
          </p>
          <h2 className="text-2xl text-white mb-2">
            Generar diagnóstico AXISSCAN™
          </h2>
          <p className="text-sm text-zinc-400 leading-6 max-w-2xl">
            Ejecuta el motor de análisis con Claude, guarda el resultado en base de datos y actualiza este diagnóstico para consulta interna.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-[#c8a96e] text-black px-8 py-4 rounded-md uppercase tracking-[0.25em] text-xs hover:bg-[#d9bb81] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Generando..." : "Generar análisis"}
        </button>
      </div>

      {error && (
        <pre className="mt-5 whitespace-pre-wrap text-sm text-red-300 bg-[#080c0f] border border-red-900/60 rounded-xl p-4 overflow-auto">
          {error}
        </pre>
      )}
    </div>
  );
}
