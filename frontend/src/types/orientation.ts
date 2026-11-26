export type SpecialtyCode = 'AI' | 'SE' | 'CS';

export type SpecialtiesMap = Record<SpecialtyCode, string>;

export interface CriteriaCatalog {
  academic_results: string[];
  skills: string[];
  interests: string[];
}

export type AccessConditionsMap = Record<SpecialtyCode, Record<string, number>>;

export interface RawStudentProfile {
  grades: number[];
  skills: number[];
  interests: number[];
}

export type RawProfilesMap = Record<string, RawStudentProfile>;

export interface StudentFacts {
  Algorithms: number;
  Programming: number;
  Mathematics: number;
  AlgorithmicSkill: number;
  ProgrammingSkill: number;
  NetworkSkill: number;
  AnalyticalSkill: number;
  InterestAI: number;
  InterestSE: number;
  InterestCS: number;
}

export type FactKey = keyof StudentFacts;

export interface AccessConditionCheck {
  criterion: FactKey;
  actual: number;
  required: number;
  met: boolean;
}

export interface SpecialtyAccessResult {
  code: SpecialtyCode;
  name: string;
  accessible: boolean;
  checks: AccessConditionCheck[];
}

export interface BaseRule {
  id: string;
  formula: string;
  category: 'access' | 'recommendation';
  specialty: SpecialtyCode;
}

export type WorkspaceView = 'students' | 'knowledge';
