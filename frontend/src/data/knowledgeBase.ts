import specialtiesRaw from '@data/specialties.json';
import criteriaRaw from '@data/criteria.json';
import accessConditionsRaw from '@data/access_conditions.json';
import profilesRaw from '@data/profiles.json';
import type {
  AccessConditionCheck,
  AccessConditionsMap,
  BaseRule,
  CriteriaCatalog,
  FactKey,
  RawProfilesMap,
  RawStudentProfile,
  SpecialtiesMap,
  SpecialtyAccessResult,
  SpecialtyCode,
  StudentFacts,
} from '../types/orientation';

export const SPECIALTIES = specialtiesRaw as SpecialtiesMap;
export const CRITERIA = criteriaRaw as CriteriaCatalog;
export const ACCESS_CONDITIONS = accessConditionsRaw as AccessConditionsMap;
export const RAW_PROFILES = profilesRaw as RawProfilesMap;

export const SPECIALTY_CODES: SpecialtyCode[] = ['AI', 'SE', 'CS'];

/**
 * Mirrors RULES in root rules.py (Stage 1).
 */
export const BASE_RULES: BaseRule[] = [
  {
    id: 'R1',
    formula: 'Algorithms >= 10 AND Mathematics >= 10 => Accessible AI',
    category: 'access',
    specialty: 'AI',
  },
  {
    id: 'R2',
    formula: 'Algorithms >= 10 AND Programming >= 10 => Accessible SE',
    category: 'access',
    specialty: 'SE',
  },
  {
    id: 'R3',
    formula: 'Algorithms >= 10 AND NetworkSkill >= 8 => Accessible CS',
    category: 'access',
    specialty: 'CS',
  },
  {
    id: 'R4',
    formula: 'Accessible AI AND Mathematics >= 14 AND AlgorithmicSkill >= 14 AND InterestAI >= 14 => Recommended AI',
    category: 'recommendation',
    specialty: 'AI',
  },
  {
    id: 'R5',
    formula: 'Accessible SE AND ProgrammingSkill >= 14 AND InterestSE >= 14 => Recommended SE',
    category: 'recommendation',
    specialty: 'SE',
  },
  {
    id: 'R6',
    formula: 'Accessible CS AND NetworkSkill >= 14 AND InterestCS >= 14 => Recommended CS',
    category: 'recommendation',
    specialty: 'CS',
  },
];

/**
 * Mirrors build_facts() in root main.py.
 */
export function buildStudentFacts(profile: RawStudentProfile): StudentFacts {
  return {
    Algorithms: profile.grades[0],
    Programming: profile.grades[1],
    Mathematics: profile.grades[2],
    AlgorithmicSkill: profile.skills[0],
    ProgrammingSkill: profile.skills[1],
    NetworkSkill: profile.skills[2],
    AnalyticalSkill: profile.skills[3],
    InterestAI: profile.interests[0],
    InterestSE: profile.interests[1],
    InterestCS: profile.interests[2],
  };
}

export function buildAllFacts(profiles: RawProfilesMap = RAW_PROFILES): Record<string, StudentFacts> {
  const result: Record<string, StudentFacts> = {};
  for (const [name, profile] of Object.entries(profiles)) {
    result[name] = buildStudentFacts(profile);
  }
  return result;
}

/**
 * Evaluates Stage 1 admission conditions from data/access_conditions.json.
 */
export function evaluateAccessConditions(facts: StudentFacts): SpecialtyAccessResult[] {
  return SPECIALTY_CODES.map((code) => {
    const thresholds = ACCESS_CONDITIONS[code];
    const checks: AccessConditionCheck[] = Object.entries(thresholds).map(([criterion, required]) => {
      const key = criterion as FactKey;
      const actual = facts[key];
      return {
        criterion: key,
        actual,
        required,
        met: actual >= required,
      };
    });
    return {
      code,
      name: SPECIALTIES[code],
      accessible: checks.every((c) => c.met),
      checks,
    };
  });
}

export function computeAcademicAverage(facts: StudentFacts): number {
  return Number(((facts.Algorithms + facts.Programming + facts.Mathematics) / 3).toFixed(1));
}
