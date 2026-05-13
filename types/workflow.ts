import {
  AnalysisInput,
  AnalysisModel,
  AnalysisType,
} from "./analysis";

export type WorkflowStep =
  | "setup"
  | "questionnaire"
  | "loading"
  | "results";

export type AnalysisSession = {
  step: WorkflowStep;

  analysisType: AnalysisType | null;

  model: AnalysisModel | null;

  currentQuestionIndex: number;

  answers: Partial<AnalysisInput["context"]>;
};
