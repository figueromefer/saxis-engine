"use client";

type Props = {
  result: any;
};

export default function ResultsScreen({
  result,
}: Props) {
  const text =
  result?.data?.text ||
  "No analysis generated.";

  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-16 border-b border-zinc-800 pb-10">

        <p className="text-xs uppercase tracking-[0.45em] text-zinc-500 mb-5">
          Strategic Intelligence Report
        </p>

        <h1 className="text-6xl text-[#c8a96e] tracking-[0.12em] mb-6">
          ANALYSIS
        </h1>

        <div className="w-24 h-px bg-zinc-700 mb-8" />

        <p className="max-w-2xl text-zinc-500 leading-relaxed">
          Strategic opportunity mapping, asymmetry detection and execution intelligence.
        </p>

      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-16">

        <aside className="space-y-6">

          <div className="border border-zinc-800 bg-[#0e1419] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-4">
              Status
            </p>

            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#7ed4a0]" />

              <span className="text-sm text-zinc-300">
                Analysis Complete
              </span>
            </div>
          </div>

          <div className="border border-zinc-800 bg-[#0e1419] rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-5">
              Intelligence Layers
            </p>

            <div className="space-y-4 text-sm text-zinc-400">

              <div className="flex justify-between">
                <span>Visible Opportunities</span>
                <span className="text-[#4a9eba]">Detected</span>
              </div>

              <div className="flex justify-between">
                <span>Hidden Leverage</span>
                <span className="text-[#c8a96e]">Mapped</span>
              </div>

              <div className="flex justify-between">
                <span>Execution Risk</span>
                <span className="text-[#e05c5c]">Analyzed</span>
              </div>

              <div className="flex justify-between">
                <span>Strategic Timing</span>
                <span className="text-[#7ed4a0]">Calculated</span>
              </div>

            </div>
          </div>

        </aside>

        <section>

          <div className="border border-zinc-800 bg-[#0e1419] rounded-3xl p-10">

            <div className="mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 mb-4">
                Executive Analysis
              </p>

              <div className="w-16 h-px bg-zinc-700" />
            </div>

            <div className="
              prose
              prose-invert
              max-w-none
              prose-p:text-zinc-300
              prose-p:leading-relaxed
              prose-headings:text-[#c8a96e]
              prose-strong:text-white
              prose-li:text-zinc-300
            ">
              {text
                .split("\n")
                .map((paragraph: string, index: number) => {
                  if (!paragraph.trim()) return null;

                  return (
                    <p
                      key={index}
                      className="mb-6 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  );
                })}
            </div>

          </div>

        </section>

      </div>

    </div>
  );
}