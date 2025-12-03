export interface RiskAnalysisResult {
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  summary: string;
  threats: {
    title: string;
    description: string;
  }[];
  recommendations: {
    title: string;
    action: string;
  }[];
}

export enum SectionId {
  HERO = 'hero',
  INTRO = 'intro',
  ANALYZER = 'analyzer',
  REGULATIONS = 'regulations',
  GUIDELINES = 'guidelines'
}
