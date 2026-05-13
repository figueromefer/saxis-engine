"use client";

import { useMemo } from "react";

import { getQuestions } from "@/lib/getQuestions";

import { AnalysisType } from "@/types/analysis";

type Props = {
  analysisType: AnalysisType;

  currentQuestionIndex: number;

  answers: Record<string, string>;

  onAnswer: (questionId: string, value: string) => void;

  onNext: () => void;

  onBack: () => void;
};

export default function QuestionnaireScreen({
  analysisType,
  currentQuestionIndex,
  answers,
  onAnswer,
  onNext,
  onBack,
}: Props) {
  const questions = useMemo(
    () => getQuestions(analysisType),
    [analysisType]
  );

  const question = questions[currentQuestionIndex];

  const progress =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  const currentValue = answers[question.id] || "";

  const canContinue = currentValue.trim().length > 0;

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-14">

        <div className="flex justify-between items-center mb-4">
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
            Strategic Intake
          </p>

          <p className="text-xs tracking-[0.25em] text-zinc-600">
            {currentQuestionIndex + 1} / {questions.length}
          </p>
        </div>

        <div className="h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4a9eba] to-[#c8a96e] transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

      </div>

      <div className="mb-16">

        <p className="text-xs uppercase tracking-[0.35em] text-[#c8a96e] mb-5">
          Question
        </p>

        <h1 className="text-4xl md:text-5xl leading-tight text-[#d4cfc8] mb-6">
          {question.label}
        </h1>

        <p className="text-zinc-500 leading-relaxed max-w-2xl">
          {question.hint}
        </p>

      </div>

      <div className="mb-16">

        <textarea
          value={currentValue}
          onChange={(e) =>
            onAnswer(question.id, e.target.value)
          }
          placeholder={question.placeholder}
          className="
            w-full
            min-h-[220px]
            bg-[#0e1419]
            border
            border-zinc-800
            rounded-2xl
            p-8
            text-[#d4cfc8]
            placeholder:text-zinc-600
            resize-none
            outline-none
            focus:border-[#c8a96e]
            transition-all
            duration-300
            leading-relaxed
          "
        />

      </div>

      <div className="flex justify-between items-center">

        <button
          onClick={onBack}
          disabled={currentQuestionIndex === 0}
          className={`
            px-8 py-4 rounded-md uppercase tracking-[0.3em] text-xs transition-all
            ${
              currentQuestionIndex === 0
                ? "bg-zinc-900 text-zinc-700 cursor-not-allowed"
                : "border border-zinc-700 text-zinc-400 hover:border-zinc-500"
            }
          `}
        >
          Back
        </button>

        <button
          onClick={onNext}
          disabled={!canContinue}
          className={`
            px-10 py-4 rounded-md uppercase tracking-[0.3em] text-xs transition-all
            ${
              canContinue
                ? "bg-[#c8a96e] text-black hover:bg-[#d9bb81]"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            }
          `}
        >
          Continue
        </button>

      </div>

    </div>
  );
}