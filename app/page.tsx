"use client";

import { useState } from "react";

import SetupScreen from "@/components/SetupScreen";
import QuestionnaireScreen from "@/components/QuestionnaireScreen";
import LoadingScreen from "@/components/LoadingScreen";
import ResultsScreen from "@/components/ResultsScreen";

import {
  AnalysisModel,
  AnalysisType,
} from "@/types/analysis";

type Step =
  | "setup"
  | "questionnaire"
  | "loading"
  | "results"
  | "error";

export default function HomePage() {
  const [step, setStep] = useState<Step>("setup");

  const [analysisType, setAnalysisType] =
    useState<AnalysisType | null>(null);

  const [model, setModel] =
    useState<AnalysisModel | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState(0);

  const [answers, setAnswers] =
    useState<Record<string, string>>({});

  const [analysisResult, setAnalysisResult] =
    useState<any>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  /*useEffect(() => {
    runAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  async function callAnalyzeApi() {
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

    const rawText = await response.text();

    if (!response.ok) {
      throw new Error(
        rawText || `API error: ${response.status}`
      );
    }

    if (!rawText) {
      throw new Error("API returned an empty response.");
    }

    try {
      return JSON.parse(rawText);
    } catch {
      throw new Error(
        `API returned invalid JSON: ${rawText.slice(0, 500)}`
      );
    }
  }

  async function runAnalysis() {
    setStep("loading");
    setErrorMessage(null);

    try {
      const data = await callAnalyzeApi();

      console.log("AUTO ANALYSIS:", data);

      setAnalysisResult(data);
      setStep("results");
    } catch (error) {
      console.error("ERROR CALLING API:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unknown analysis error"
      );

      setStep("error");
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
      console.log("FINAL ANSWERS:", answers);
      await runAnalysis();
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

      {step === "results" && analysisResult && (
        <ResultsScreen result={analysisResult} />
      )}

      {step === "error" && (
        <div className="max-w-4xl mx-auto border border-red-900/60 bg-[#0e1419] rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-red-400 mb-4">
            Analysis Error
          </p>

          <h1 className="text-3xl text-white mb-6">
            No se pudo generar el análisis
          </h1>

          <pre className="whitespace-pre-wrap text-sm text-zinc-300 bg-[#080c0f] border border-zinc-800 rounded-xl p-6 mb-8 overflow-auto max-h-[420px]">
            {errorMessage}
          </pre>

          <button
            onClick={runAnalysis}
            className="bg-[#c8a96e] text-black px-8 py-4 rounded-md uppercase tracking-[0.25em] text-xs hover:bg-[#d9bb81] transition-all"
          >
            Reintentar análisis
          </button>
        </div>
      )}
    </main>
  );
}
