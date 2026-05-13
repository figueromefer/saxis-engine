"use client";

import { parseAnalysis } from "@/lib/parseAnalysis";
type Props = {
  result: any;
};

export default function ResultsScreen({
  result,
}: Props) {

  const raw =
    result?.data || "";

  const parsed =
  parseAnalysis(raw);

if (!parsed) {
  return (
    <div className="text-red-500 p-10">
      Failed to parse analysis JSON.
    </div>
  );
}

const project =
  parsed?.project ||
  parsed?.analysis?.project ||
  "Strategic Analysis";

const intelligence =
  parsed?.strategic_intelligence ||
  parsed?.analysis?.strategic_intelligence ||
  parsed?.analysis?.insights ||
  parsed?.insights;

  if (!intelligence) {
    console.log("PARSED ANALYSIS DEBUG:", parsed);

    return (
      <div className="max-w-4xl mx-auto p-10 text-red-400">
        <h1 className="text-3xl mb-4">
          Analysis structure not recognized.
        </h1>

        <pre className="whitespace-pre-wrap text-xs bg-[#0e1419] border border-zinc-800 rounded-xl p-6 text-zinc-300 overflow-auto max-h-[500px]">
          {JSON.stringify(parsed, null, 2)}
        </pre>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto">

      <div className="mb-20">

        <p className="text-xs uppercase tracking-[0.45em] text-zinc-500 mb-5">
          Strategic Intelligence Report
        </p>

        <h1 className="text-7xl text-[#c8a96e] tracking-[0.12em] mb-8">
          {project}
        </h1>

        <div className="w-32 h-px bg-zinc-700 mb-10" />

        <p className="max-w-3xl text-zinc-400 leading-relaxed text-lg">
          Strategic asymmetry mapping, territorial leverage detection
          and execution intelligence analysis.
        </p>

      </div>

      <SectionTitle
        title="Asymmetric Opportunities"
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {(intelligence.asymmetricOpportunities || []).map(
          (item: any) => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.insight}
              leverage={item.leverage || item.mechanism || item.implication || item.risk || item.window || item.execution}
              specificity={item.urgency || item.priority || item.gap || ""}
              color="gold"
            />
          )
        )}
      </div>

      <SectionTitle
        title="Invisible Leverage"
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {(intelligence.invisibleLeverage || []).map(
          (item: any) => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.insight}
              leverage={item.leverage || item.mechanism || item.implication || item.risk || item.window || item.execution}
              specificity={item.urgency || item.priority || item.gap || ""}
              color="blue"
            />
          )
        )}
      </div>

      <SectionTitle
        title="Hidden Market Dynamics"
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {(intelligence.hiddenMarketDynamics || []).map(
          (item: any) => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.insight}
              leverage={item.leverage || item.mechanism || item.implication || item.risk || item.window || item.execution}
              specificity={item.urgency || item.priority || item.gap || ""}
              color="green"
            />
          )
        )}
      </div>

      <SectionTitle
        title="Strategic Contradictions"
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {(intelligence.strategicContradictions || []).map(
          (item: any) => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.insight}
              leverage={item.leverage || item.mechanism || item.implication || item.risk || item.window || item.execution}
              specificity={item.urgency || item.priority || item.gap || ""}
              color="red"
            />
          )
        )}
      </div>

      <SectionTitle
        title="Timing Advantages"
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {(intelligence.timingAdvantages || []).map(
          (item: any) => (
            <InsightCard
              key={item.id}
              title={item.title}
              observation={item.insight}
              leverage={item.leverage || item.mechanism || item.implication || item.risk || item.window || item.execution}
              specificity={item.urgency || item.priority || item.gap || ""}
              color="purple"
            />
          )
        )}
      </div>

    </div>
  );
}

function SectionTitle({
  title,
}: {
  title: string;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-4xl text-[#c8a96e] tracking-[0.08em] mb-4">
        {title}
      </h2>

      <div className="w-20 h-px bg-zinc-700" />
    </div>
  );
}

function InsightCard({
  title,
  observation,
  leverage,
  specificity,
  color,
}: any) {

  const colorClasses: Record<string, string> = {
    gold: "border-[#c8a96e]",
    blue: "border-[#4a9eba]",
    green: "border-[#58b26b]",
    red: "border-[#c65b5b]",
    purple: "border-[#8b6bd6]",
  };

  const borderColor =
    colorClasses[color] || "border-zinc-700";

  return (
    <div
      className={`
        border
        ${borderColor}
        bg-[#0e1419]
        rounded-3xl
        p-8
      `}
    >

      <h3 className="text-2xl text-white mb-6 leading-snug">
        {title}
      </h3>

      <div className="space-y-6 text-zinc-400 leading-relaxed">

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Observation
          </p>

          <p>
            {observation}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Strategic Leverage
          </p>

          <p>
            {leverage}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Specificity
          </p>

          <p>
            {specificity}
          </p>
        </div>

      </div>

    </div>
  );
}