type ActionItem = {
  action?: string;
  reason?: string;
  expected_impact?: string;
};

type OpportunityItem = {
  title?: string;
  insight?: string;
  recommended_action?: string;
  risk_if_ignored?: string;
};

type RiskItem = {
  title?: string;
  why_it_matters?: string;
  mitigation?: string;
};

type AnalysisReport = {
  executive_summary?: string;
  strategic_verdict?: string;
  main_tension?: {
    title?: string;
    explanation?: string;
    business_impact?: string;
  };
  highest_value_move?: {
    title?: string;
    why_this_move?: string;
    first_action?: string;
    expected_result?: string;
  };
  priority_actions?: {
    next_30_days?: ActionItem[];
    next_90_days?: ActionItem[];
    critical_metric?: {
      name?: string;
      why_it_matters?: string;
      how_to_track?: string;
    };
  };
  opportunities?: OpportunityItem[];
  risks?: RiskItem[];
};

type AdminAnalysisReportProps = {
  analysis: unknown;
};

function asReport(analysis: unknown): AnalysisReport {
  if (analysis && typeof analysis === "object") {
    return analysis as AnalysisReport;
  }

  return {};
}

function EmptyState({ label }: { label: string }) {
  return <p className="text-sm text-zinc-500">{label}</p>;
}

function Card({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border border-[#26333a] bg-[#0e1419] rounded-3xl p-7">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.25em] text-[#c8a96e] mb-4">
          {eyebrow}
        </p>
      )}
      {title && <h3 className="text-2xl text-white mb-4">{title}</h3>}
      <div className="text-zinc-300 leading-7">{children}</div>
    </article>
  );
}

function ActionList({ title, items }: { title: string; items?: ActionItem[] }) {
  return (
    <Card eyebrow="Acciones prioritarias" title={title}>
      <div className="space-y-5">
        {items?.length ? (
          items.map((item, index) => (
            <div key={`${title}-${index}`} className="border-l border-[#c8a96e]/40 pl-5">
              <p className="text-white font-medium mb-2">{item.action}</p>
              <p className="text-sm text-zinc-400 mb-1">Razón: {item.reason}</p>
              <p className="text-sm text-zinc-500">Impacto esperado: {item.expected_impact}</p>
            </div>
          ))
        ) : (
          <EmptyState label="Sin acciones disponibles." />
        )}
      </div>
    </Card>
  );
}

export default function AdminAnalysisReport({ analysis }: AdminAnalysisReportProps) {
  const report = asReport(analysis);

  return (
    <section className="space-y-8 mb-10">
      <div className="border border-[#3a3020] bg-gradient-to-br from-[#121920] to-[#0e1419] rounded-3xl p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
          Resultado interno AXISSCAN™
        </p>
        <h2 className="text-3xl md:text-4xl text-white leading-tight mb-5">
          {report.strategic_verdict || "Análisis generado"}
        </h2>
        <p className="text-zinc-300 leading-8 max-w-4xl">
          {report.executive_summary || "El análisis fue generado, pero no incluyó resumen ejecutivo."}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card eyebrow="Tensión principal" title={report.main_tension?.title || "Sin título"}>
          <p className="mb-4">{report.main_tension?.explanation}</p>
          <p className="text-sm text-[#c8a96e]">Impacto: {report.main_tension?.business_impact}</p>
        </Card>

        <Card eyebrow="Movimiento de mayor valor" title={report.highest_value_move?.title || "Sin título"}>
          <p className="mb-4">{report.highest_value_move?.why_this_move}</p>
          <p className="text-sm text-zinc-400 mb-2">Primera acción: {report.highest_value_move?.first_action}</p>
          <p className="text-sm text-[#c8a96e]">Resultado esperado: {report.highest_value_move?.expected_result}</p>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <ActionList title="Próximos 30 días" items={report.priority_actions?.next_30_days} />
        <ActionList title="Próximos 90 días" items={report.priority_actions?.next_90_days} />
      </div>

      <Card eyebrow="Métrica crítica" title={report.priority_actions?.critical_metric?.name || "Sin métrica crítica"}>
        <p className="mb-3">{report.priority_actions?.critical_metric?.why_it_matters}</p>
        <p className="text-sm text-[#c8a96e]">Cómo medir: {report.priority_actions?.critical_metric?.how_to_track}</p>
      </Card>

      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
          Oportunidades detectadas
        </p>
        <div className="grid gap-6">
          {report.opportunities?.length ? (
            report.opportunities.map((item, index) => (
              <Card key={`opportunity-${index}`} title={item.title || `Oportunidad ${index + 1}`}>
                <p className="mb-3">{item.insight}</p>
                <p className="text-sm text-zinc-400 mb-2">Acción recomendada: {item.recommended_action}</p>
                <p className="text-sm text-red-300">Riesgo si se ignora: {item.risk_if_ignored}</p>
              </Card>
            ))
          ) : (
            <EmptyState label="Sin oportunidades disponibles." />
          )}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
          Riesgos ocultos
        </p>
        <div className="grid gap-6">
          {report.risks?.length ? (
            report.risks.map((item, index) => (
              <Card key={`risk-${index}`} title={item.title || `Riesgo ${index + 1}`}>
                <p className="mb-3">{item.why_it_matters}</p>
                <p className="text-sm text-[#c8a96e]">Mitigación: {item.mitigation}</p>
              </Card>
            ))
          ) : (
            <EmptyState label="Sin riesgos disponibles." />
          )}
        </div>
      </div>
    </section>
  );
}
