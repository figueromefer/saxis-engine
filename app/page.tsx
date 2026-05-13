"use client";

import { useEffect, useState } from "react";

import SetupScreen from "@/components/SetupScreen";
import QuestionnaireScreen from "@/components/QuestionnaireScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";
import { mockAnswers } from "@/data/mockAnswers";

import {
  AnalysisModel,
  AnalysisType,
} from "@/types/analysis";

type Step =
  | "setup"
  | "questionnaire"
  | "loading"
  | "results";

export default function HomePage() {
  const [step, setStep] =
  useState<Step>("loading");

  const [analysisType, setAnalysisType] =
  useState<AnalysisType | null>("property");

  const [model, setModel] =
  useState<AnalysisModel | null>("saxis_9");

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] =
  useState<Record<string, string>>(mockAnswers);

    const [analysisResult, setAnalysisResult] =
  useState<any>(null);

  useEffect(() => {
  runAnalysis();
}, []);

async function runAnalysis() {
  try {

    const response = await fetch(
      "/api/analyze",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          analysisType,
          model,
          answers,
        }),
      }
    );

    const data =
      await response.json();

    console.log(
      "AUTO ANALYSIS:",
      data
    );

    setAnalysisResult(data);

    setStep("results");

  } catch (error) {
    console.error(error);
  }
}

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

  async function handleNextQuestion() {
    const totalQuestions = 14;
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= totalQuestions) {
      setStep("loading");

      console.log("FINAL ANSWERS:", answers);

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            analysisType,
            model,
            answers,
          }),
        });

        const data = await response.json();

        console.log("AI RESULT:", data);

        setAnalysisResult(data);

        setStep("results");
      } catch (error) {
        console.error("ERROR CALLING API:", error);
      }

      return;
    }

    setCurrentQuestionIndex(nextIndex);
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

      {step === "questionnaire" && analysisType && (
        <QuestionnaireScreen
          analysisType={analysisType}
          currentQuestionIndex={currentQuestionIndex}
          answers={answers}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onBack={handleBackQuestion}
        />
      )}

      {step === "loading" && (
  <LoadingScreen />
)}

      {step === "results" &&
  analysisResult && (
    <ResultsScreen
      result={analysisResult}
    />
)}
    </main>
  );
}