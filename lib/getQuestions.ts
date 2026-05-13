import {
  baseQuestions,
  propertyQuestions,
  ventureQuestions,
  Question,
} from "@/data/questions";

import { AnalysisType } from "@/types/analysis";

export function getQuestions(
  analysisType: AnalysisType
): Question[] {
  
  const specificQuestions =
    analysisType === "property"
      ? propertyQuestions
      : ventureQuestions;

  return [
    ...baseQuestions,
    ...specificQuestions,
  ];
}