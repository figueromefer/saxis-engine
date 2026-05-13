"use client";

import { parseAnalysis } from "@/lib/parseAnalysis";

type Props = {
  result: any;
};

type SectionConfig = {
  key: string;
  title: string;
  color: "gold" | "blue" | "green" | "red" | "purple";
};

const sections: SectionConfig[] = [
  {
    key: "asymmetric_opportunities",
    title: "Oportunidades Asimétricas",
    color: "gold",
  },
  {
    key: "invisible_leverage",
    title: "Leverage Invisible",
    color: "blue",
  },
  {
    key: "hidden_market_dynamics",
    title: "Dinámicas Ocultas del Mercado",
    color: "green",
  },
  {
    key: "strategic_contradictions",
    title: "Contradicciones Estratégicas",
    color: "red",
  },
  {
    key: "timing_advantages",
    title: "Ventajas de Timing",
    color: "purple",
  },
  {
    key: "territorial_positioning",
    title: "Posicionamiento Territorial",
    color: "gold",
  },
  {
    key: "execution_risks",
    title: "Riesgos de Ejecución",
    color: "red",
  },
  {
    key: "narrative_gaps",
    title: "Brechas Narrativas",
    color: "blue",
  },
];

export default function ResultsScreen({ result }: Props) {
  const raw = result?.data || "";

  const parsed = parseAnalysis(raw);

  if (!parsed) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-red-400">
        <h1 className="text-3xl mb-4">Failed to parse analysis JSON.</h1>

        <pre className="whitespace-pre-wrap text-xs bg-[#0e1419] border border-zinc-800 rounded-xl p-6 text-zinc-300 overflow-auto max-h-[500px]">
          {typeof raw === "string" ? raw : JSON.stringify(raw, null, 2)}
        </pre>
      </div>
    );
  }

  const project =
    parsed?.project ||
    parsed?.analysis?.project ||
    "Strategic Analysis";

  const model =
    parsed?.model ||
    parsed?.analysis?.model ||
    "saxis";

  const intelligence =
    parsed?.strategic_intelligence ||
    parsed?.analysis?.strategic_intelligence ||
    parsed?.analysis?.insights ||
    parsed?.insights ||
    {};

  const priorityActions =
    intelligence?.priority_actions ||
    parsed?.priority_actions ||
    null;

  return (
    <div className="max-w-7xl mx-auto">
      <ReportHeader project={project} model={model} />

      <div className="mb-20 border border-zinc-800 bg-[#0e1419] rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">
          Diagnóstico General
        </p>

        <p className="text-zinc-300 leading-relaxed text-lg">
          Este reporte identifica señales estratégicas, oportunidades no obvias,
          contradicciones internas, riesgos de ejecución y rutas prioritarias de
          acción para convertir el proyecto en una ventaja comercial defendible.
        </p>
      </div>

      {sections.map((section) => {
        const items = intelligence?.[section.key] || [];

        if (!Array.isArray(items) || items.length === 0) {
          return null;
        }

        return (
          <div key={section.key}>
            <SectionTitle title={section.title} />

            <div className="grid lg:grid-cols-2 gap-8 mb-24">
              {items.map((item: any, index: number) => (
                <InsightCard
                  key={item.id || `${section.key}-${index}`}
                  item={item}
                  color={section.color}
                />
              ))}
            </div>
          </div>
        );
      })}

      {priorityActions && (
        <PriorityActions actions={priorityActions} />
      )}
    </div>
  );
}

function ReportHeader({
  project,
  model,
}: {
  project: string;
  model: string;
}) {
  return (
    <div className="mb-20">
      <p className="text-xs uppercase tracking-[0.45em] text-zinc-500 mb-5">
        Strategic Intelligence Report
      </p>

      <h1 className="text-6xl md:text-7xl text-[#c8a96e] tracking-[0.12em] mb-8">
        {project}
      </h1>

      <div className="flex flex-wrap gap-3 mb-10">
        <span className="border border-zinc-800 bg-[#0e1419] px-4 py-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
          {model}
        </span>

        <span className="border border-[#c8a96e]/40 bg-[#0e1419] px-4 py-2 text-xs uppercase tracking-[0.25em] text-[#c8a96e]">
          Intelligence Output
        </span>
      </div>

      <div className="w-32 h-px bg-zinc-700 mb-10" />

      <p className="max-w-3xl text-zinc-400 leading-relaxed text-lg">
        Mapa de oportunidades, leverage territorial, contradicciones
        estratégicas y secuencia de ejecución prioritaria.
      </p>
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl text-[#c8a96e] tracking-[0.08em] mb-4">
        {title}
      </h2>

      <div className="w-20 h-px bg-zinc-700" />
    </div>
  );
}

function InsightCard({
  item,
  color,
}: {
  item: any;
  color: "gold" | "blue" | "green" | "red" | "purple";
}) {
  const colorClasses: Record<string, string> = {
    gold: "border-[#c8a96e]",
    blue: "border-[#4a9eba]",
    green: "border-[#58b26b]",
    red: "border-[#c65b5b]",
    purple: "border-[#8b6bd6]",
  };

  const labelColorClasses: Record<string, string> = {
    gold: "text-[#c8a96e]",
    blue: "text-[#4a9eba]",
    green: "text-[#58b26b]",
    red: "text-[#c65b5b]",
    purple: "text-[#8b6bd6]",
  };

  const borderColor = colorClasses[color] || "border-zinc-700";
  const labelColor = labelColorClasses[color] || "text-zinc-400";

  const mainText =
    item.insight ||
    item.observation ||
    item.description ||
    "";

  const secondaryText =
    item.leverage ||
    item.execution ||
    item.implication ||
    item.resolution ||
    item.action ||
    item.mitigation ||
    item.mechanism ||
    "";

  const tertiaryText =
    item.urgency ||
    item.priority ||
    item.window ||
    item.gap ||
    "";

  return (
    <article
      className={`border ${borderColor} bg-[#0e1419] rounded-3xl p-8 shadow-2xl shadow-black/20`}
    >
      <div className="flex items-start justify-between gap-6 mb-6">
        <h3 className="text-2xl text-white leading-snug">
          {item.title || "Untitled Insight"}
        </h3>

        {item.id && (
          <span className={`text-xs tracking-[0.25em] uppercase ${labelColor}`}>
            {item.id}
          </span>
        )}
      </div>

      {mainText && (
        <TextBlock
          label="Insight"
          text={mainText}
        />
      )}

      {secondaryText && (
        <TextBlock
          label="Implicación Estratégica"
          text={secondaryText}
        />
      )}

      {tertiaryText && (
        <TextBlock
          label="Prioridad / Ventana"
          text={tertiaryText}
        />
      )}
    </article>
  );
}

function TextBlock({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">
        {label}
      </p>

      <p className="text-zinc-300 leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function PriorityActions({ actions }: { actions: any }) {
  const next30 =
    actions?.next_30_days ||
    [];

  const next90 =
    actions?.next_90_days ||
    [];

  const criticalMetric =
    actions?.critical_metric ||
    "";

  return (
    <section className="mb-24">
      <SectionTitle title="Acciones Prioritarias" />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <ActionList
          title="Próximos 30 días"
          items={next30}
        />

        <ActionList
          title="Próximos 90 días"
          items={next90}
        />
      </div>

      {criticalMetric && (
        <div className="border border-[#c8a96e] bg-[#0e1419] rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">
            Métrica Crítica
          </p>

          <p className="text-xl text-[#c8a96e] leading-relaxed">
            {criticalMetric}
          </p>
        </div>
      )}
    </section>
  );
}

function ActionList({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="border border-zinc-800 bg-[#0e1419] rounded-3xl p-8">
      <h3 className="text-2xl text-white mb-6">
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="flex gap-4"
          >
            <span className="text-[#c8a96e] text-sm pt-1">
              {String(index + 1).padStart(2, "0")}
            </span>

            <p className="text-zinc-300 leading-relaxed">
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}