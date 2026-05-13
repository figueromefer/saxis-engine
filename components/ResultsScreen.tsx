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
    key: "execution_risks",
    title: "Riesgos de Ejecución",
    color: "red",
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

  const project = parsed?.project || parsed?.analysis?.project || "Strategic Analysis";
  const model = parsed?.model || parsed?.analysis?.model || "saxis";
  const executiveSummary = parsed?.executive_summary || "";
  const strategicVerdict = parsed?.strategic_verdict || "";
  const mainTension = parsed?.main_tension || null;
  const highestValueMove = parsed?.highest_value_move || null;

  const intelligence =
    parsed?.strategic_intelligence ||
    parsed?.analysis?.strategic_intelligence ||
    parsed?.analysis?.insights ||
    parsed?.insights ||
    {};

  const priorityActions = parsed?.priority_actions || intelligence?.priority_actions || null;

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <ReportHeader project={project} model={model} />

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 mb-16">
        <PremiumPanel label="Resumen Ejecutivo" title="Lectura estratégica general">
          <p className="text-zinc-300 leading-relaxed text-lg">{executiveSummary}</p>
        </PremiumPanel>

        <PremiumPanel label="Veredicto Estratégico" title="Estado del posicionamiento">
          <p className="text-zinc-300 leading-relaxed">{strategicVerdict}</p>
        </PremiumPanel>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-24">
        {mainTension && (
          <StrategicHighlight
            label="Tensión Principal"
            title={mainTension.title}
            body={mainTension.explanation}
            footerLabel="Impacto de negocio"
            footer={mainTension.business_impact}
            color="red"
          />
        )}

        {highestValueMove && (
          <StrategicHighlight
            label="Movimiento de Mayor Valor"
            title={highestValueMove.title}
            body={highestValueMove.why_this_move}
            footerLabel="Primera acción"
            footer={highestValueMove.first_action}
            color="gold"
          />
        )}
      </div>

      {sections.map((section) => {
        const items = intelligence?.[section.key] || [];
        if (!Array.isArray(items) || items.length === 0) return null;

        return (
          <section key={section.key} className="mb-24">
            <SectionTitle title={section.title} />
            <div className="grid lg:grid-cols-2 gap-8">
              {items.map((item: any, index: number) => (
                <InsightCard
                  key={item.id || `${section.key}-${index}`}
                  item={item}
                  color={section.color}
                />
              ))}
            </div>
          </section>
        );
      })}

      {priorityActions && <PriorityActions actions={priorityActions} />}
    </div>
  );
}

function ReportHeader({ project, model }: { project: string; model: string }) {
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
          Premium Strategic Output
        </span>
      </div>
      <div className="w-32 h-px bg-zinc-700 mb-10" />
      <p className="max-w-3xl text-zinc-400 leading-relaxed text-lg">
        Reporte de inteligencia estratégica con lectura ejecutiva, tensión central,
        oportunidad de mayor valor, riesgos accionables y secuencia prioritaria.
      </p>
    </div>
  );
}

function PremiumPanel({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <article className="border border-zinc-800 bg-[#0e1419] rounded-3xl p-8 shadow-2xl shadow-black/20">
      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">{label}</p>
      <h2 className="text-2xl text-[#c8a96e] mb-6">{title}</h2>
      {children}
    </article>
  );
}

function StrategicHighlight({ label, title, body, footerLabel, footer, color }: any) {
  const colors: Record<string, string> = {
    gold: "border-[#c8a96e]",
    red: "border-[#c65b5b]",
  };

  return (
    <article className={`border ${colors[color] || "border-zinc-700"} bg-[#0e1419] rounded-3xl p-8 shadow-2xl shadow-black/20`}>
      <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">{label}</p>
      <h2 className="text-3xl text-white leading-tight mb-6">{title}</h2>
      <p className="text-zinc-300 leading-relaxed mb-8">{body}</p>
      {footer && (
        <div className="border-t border-zinc-800 pt-6">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">{footerLabel}</p>
          <p className="text-[#c8a96e] leading-relaxed">{footer}</p>
        </div>
      )}
    </article>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl text-[#c8a96e] tracking-[0.08em] mb-4">{title}</h2>
      <div className="w-20 h-px bg-zinc-700" />
    </div>
  );
}

function InsightCard({ item, color }: { item: any; color: "gold" | "blue" | "green" | "red" | "purple" }) {
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

  return (
    <article className={`border ${borderColor} bg-[#0e1419] rounded-3xl p-8 shadow-2xl shadow-black/20`}>
      <div className="flex items-start justify-between gap-6 mb-6">
        <h3 className="text-2xl text-white leading-snug">{item.title || "Insight"}</h3>
        {item.id && <span className={`text-xs tracking-[0.25em] uppercase ${labelColor}`}>{item.id}</span>}
      </div>

      <TextBlock label="Lectura estratégica" text={item.strategic_read || item.insight || ""} />
      <TextBlock label="Por qué importa" text={item.why_it_matters || ""} />
      <TextBlock label="Acción recomendada" text={item.recommended_action || item.action || ""} />
      <TextBlock label="Ángulo comercial" text={item.commercial_angle || ""} />
      <TextBlock label="Riesgo si se ignora" text={item.risk_if_ignored || ""} />
    </article>
  );
}

function TextBlock({ label, text }: { label: string; text: string }) {
  if (!text) return null;

  return (
    <div className="mb-6 last:mb-0">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-3">{label}</p>
      <p className="text-zinc-300 leading-relaxed">{text}</p>
    </div>
  );
}

function PriorityActions({ actions }: { actions: any }) {
  const next30 = actions?.next_30_days || [];
  const next90 = actions?.next_90_days || [];
  const criticalMetric = actions?.critical_metric || null;

  return (
    <section className="mb-24">
      <SectionTitle title="Secuencia Prioritaria" />
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <ActionList title="Próximos 30 días" items={next30} />
        <ActionList title="Próximos 90 días" items={next90} />
      </div>

      {criticalMetric && (
        <div className="border border-[#c8a96e] bg-[#0e1419] rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">Métrica Crítica</p>
          <h3 className="text-2xl text-[#c8a96e] mb-4">{criticalMetric.name}</h3>
          <TextBlock label="Por qué importa" text={criticalMetric.why_it_matters} />
          <TextBlock label="Cómo medirla" text={criticalMetric.how_to_track} />
        </div>
      )}
    </section>
  );
}

function ActionList({ title, items }: { title: string; items: any[] }) {
  return (
    <div className="border border-zinc-800 bg-[#0e1419] rounded-3xl p-8">
      <h3 className="text-2xl text-white mb-6">{title}</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="border-t border-zinc-800 pt-6 first:border-t-0 first:pt-0">
            <div className="flex gap-4 mb-3">
              <span className="text-[#c8a96e] text-sm pt-1">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-zinc-100 leading-relaxed">{item.action || item}</p>
            </div>
            {item.reason && <p className="text-zinc-500 leading-relaxed mb-2 ml-10">{item.reason}</p>}
            {item.expected_impact && <p className="text-[#c8a96e] leading-relaxed ml-10">{item.expected_impact}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
