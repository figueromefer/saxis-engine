"use client";

import { useState } from "react";

import SetupScreen from "@/components/SetupScreen";
import QuestionnaireScreen from "@/components/QuestionnaireScreen";

import {
  AnalysisModel,
  AnalysisType,
} from "@/types/analysis";

type Step =
  | "setup"
  | "questionnaire";

export default function HomePage() {
  const [step, setStep] =
    useState<Step>("setup");

  const [analysisType, setAnalysisType] =
    useState<AnalysisType | null>(null);

  const [model, setModel] =
    useState<AnalysisModel | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  function handleContinueSetup() {
    if (!analysisType || !model) return;

    setStep("questionnaire");
  }

  function handleAnswer(
    questionId: string,
    value: string
  ) {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }

  function handleNextQuestion() {
    setCurrentQuestionIndex((prev) => prev + 1);
  }

  function handleBackQuestion() {
    setCurrentQuestionIndex((prev) =>
      Math.max(prev - 1, 0)
    );
  }

  return (
    <main className="min-h-screen bg-[#080c0f] text-[#d4cfc8] px-6 py-16">

      {step === "setup" && (
        <SetupScreen
          analysisType={analysisType}
          model={model}
          onSelectType={setAnalysisType}
          onSelectModel={setModel}
          onContinue={handleContinueSetup}
        />
      )}

      {step === "questionnaire" &&
        analysisType && (
          <QuestionnaireScreen
            analysisType={analysisType}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onBack={handleBackQuestion}
          />
        )}

    </main>
  );
}