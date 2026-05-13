export type AnalysisType = "property" | "venture";

export type AnalysisModel = "saxis_4" | "saxis_9";

export type Difficulty = "low" | "medium" | "high";

export type Potential = "low" | "medium" | "high";

export type Severity = "low" | "medium" | "high";

export type AnalysisInput = {
  analysisType: AnalysisType;
  model: AnalysisModel;
  context: {
    name: string;
    location?: string;
    targetMarket: string;
    currentStage: string;
    mainGoal: string;
    constraints: string;
    knownOpportunities: string;
    suspectedOpportunities: string;
    risks: string;
    competitorsOrAlternatives: string;
    availableAssets: string;
    timeline: string;
    budgetRange?: string;
  };
};

export type Opportunity = {
  title: string;
  type: "visible" | "hidden";
  category: string;
  whyItMatters: string;
  evidenceFromInput: string;
  action: string;
  difficulty: Difficulty;
  potential: Potential;
};

export type HiddenRisk = {
  title: string;
  severity: Severity;
  whyItIsHidden: string;
  trigger: string;
  mitigation: string;
};

export type OpportunityMap = {
  visibleImmediate: string[];
  visibleStructural: string[];
  hiddenLatent: string[];
  hiddenTerritorial: string[];
};

export type ActionStep = {
  order: number;
  action: string;
  reason: string;
  expectedImpact: string;
  riskIfSkipped: string;
};

export type StrategicScore = {
  dimension: string;
  score: number;
  explanation: string;
};

export type AnalysisOutput = {
  executiveSummary: string;
  strategicDiagnosis: string;
  visibleOpportunities: Opportunity[];
  hiddenOpportunities: Opportunity[];
  hiddenRisks: HiddenRisk[];
  opportunityMap: OpportunityMap;
  axisSequence: ActionStep[];
  scores: StrategicScore[];
  finalVerdict: string;
};