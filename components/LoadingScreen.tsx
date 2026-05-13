"use client";

import { useEffect, useState } from "react";

const loadingSteps = [
  "Mapping visible opportunities...",
  "Detecting hidden leverage...",
  "Analyzing execution friction...",
  "Evaluating asymmetrical positioning...",
  "Scanning territorial dynamics...",
  "Calculating strategic timing...",
  "Building AXIS execution sequence...",
  "Generating strategic narrative...",
];

export default function LoadingScreen() {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleSteps((prev) => {
        if (prev >= loadingSteps.length) {
          clearInterval(interval);
          return prev;
        }

        return prev + 1;
      });
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto min-h-[70vh] flex flex-col justify-center">

      <div className="text-center mb-16">

        <div className="w-20 h-20 rounded-full border-2 border-zinc-800 border-t-[#c8a96e] animate-spin mx-auto mb-10" />

        <p className="text-xs uppercase tracking-[0.45em] text-zinc-500 mb-6">
          Strategic Analysis Engine
        </p>

        <h1 className="text-5xl text-[#c8a96e] tracking-[0.15em] mb-8">
          PROCESSING
        </h1>

        <div className="w-24 h-px bg-zinc-700 mx-auto" />

      </div>

      <div className="space-y-5 max-w-2xl mx-auto w-full">

        {loadingSteps.slice(0, visibleSteps).map((step) => (
          <div
            key={step}
            className="
              border
              border-zinc-800
              bg-[#0e1419]
              rounded-xl
              px-6
              py-5
              text-zinc-400
              tracking-[0.08em]
              animate-[fadeIn_0.5s_ease]
            "
          >
            {step}
          </div>
        ))}

      </div>

    </div>
  );
}