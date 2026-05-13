"use client";

import { AnalysisModel, AnalysisType } from "@/types/analysis";

type Props = {
  analysisType: AnalysisType | null;
  model: AnalysisModel | null;

  onSelectType: (type: AnalysisType) => void;
  onSelectModel: (model: AnalysisModel) => void;

  onContinue: () => void;
};

export default function SetupScreen({
  analysisType,
  model,
  onSelectType,
  onSelectModel,
  onContinue,
}: Props) {
  const canContinue = analysisType && model;

  return (
    <div className="max-w-5xl mx-auto">

      <div className="text-center mb-20">
        <p className="text-xs tracking-[0.45em] uppercase text-zinc-500 mb-4">
          Strategic Intelligence System
        </p>

        <h1 className="text-7xl text-[#c8a96e] tracking-[0.15em] font-black">
          SAXIS
        </h1>

        <div className="w-24 h-px bg-zinc-700 mx-auto my-8" />

        <p className="max-w-2xl mx-auto text-zinc-400 leading-relaxed">
          Detect visible opportunities, hidden leverage, strategic blind spots
          and asymmetric execution paths.
        </p>
      </div>

      <div className="mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-6">
          Analysis Type
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => onSelectType("property")}
            className={`border rounded-xl p-8 text-left transition-all duration-300 ${
              analysisType === "property"
                ? "border-[#c8a96e] bg-[#131b21]"
                : "border-zinc-800 bg-[#0e1419] hover:border-zinc-600"
            }`}
          >
            <div className="text-5xl mb-6">▣</div>

            <h2 className="text-3xl text-[#c8a96e] tracking-[0.08em] mb-4">
              PROPERTY
            </h2>

            <p className="text-zinc-400 leading-relaxed text-sm">
              Real estate assets, land, developments, territorial positioning,
              hidden value and strategic transformation potential.
            </p>
          </button>

          <button
            onClick={() => onSelectType("venture")}
            className={`border rounded-xl p-8 text-left transition-all duration-300 ${
              analysisType === "venture"
                ? "border-[#4a9eba] bg-[#131b21]"
                : "border-zinc-800 bg-[#0e1419] hover:border-zinc-600"
            }`}
          >
            <div className="text-5xl mb-6">◉</div>

            <h2 className="text-3xl text-[#4a9eba] tracking-[0.08em] mb-4">
              VENTURE
            </h2>

            <p className="text-zinc-400 leading-relaxed text-sm">
              Business models, ventures, startups, strategic positioning,
              leverage opportunities and asymmetric growth paths.
            </p>
          </button>

        </div>
      </div>

      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-6">
          Analysis Model
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <button
            onClick={() => onSelectModel("saxis_4")}
            className={`border rounded-xl p-8 text-left transition-all duration-300 ${
              model === "saxis_4"
                ? "border-[#4a9eba] bg-[#131b21]"
                : "border-zinc-800 bg-[#0e1419] hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl text-[#4a9eba] tracking-[0.12em]">
                +4
              </h2>

              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Fast Diagnostic
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Rapid strategic evaluation focused on timing, leverage,
              differentiation and execution sequence.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Timing",
                "Leverage",
                "Differentiation",
                "Execution",
              ].map((item) => (
                <span
                  key={item}
                  className="border border-zinc-700 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-zinc-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </button>

          <button
            onClick={() => onSelectModel("saxis_9")}
            className={`border rounded-xl p-8 text-left transition-all duration-300 ${
              model === "saxis_9"
                ? "border-[#c8a96e] bg-[#131b21]"
                : "border-zinc-800 bg-[#0e1419] hover:border-zinc-600"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl text-[#c8a96e] tracking-[0.12em]">
                +9
              </h2>

              <span className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                Deep Strategic Analysis
              </span>
            </div>

            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Full-spectrum strategic intelligence focused on asymmetry,
              hidden demand, territorial leverage and long-term positioning.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Territory",
                "Narrative",
                "Asymmetry",
                "Risk",
                "Sequence",
              ].map((item) => (
                <span
                  key={item}
                  className="border border-zinc-700 px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-zinc-500"
                >
                  {item}
                </span>
              ))}
            </div>
          </button>

        </div>
      </div>

      <div className="flex justify-center">
        <button
          disabled={!canContinue}
          onClick={onContinue}
          className={`px-12 py-4 tracking-[0.35em] uppercase text-xs transition-all duration-300 rounded-md ${
            canContinue
              ? "bg-[#c8a96e] text-black hover:bg-[#d9bb81]"
              : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Begin Strategic Analysis
        </button>
      </div>

    </div>
  );
}