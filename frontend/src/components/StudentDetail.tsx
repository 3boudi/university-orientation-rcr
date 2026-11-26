import { Avatar, Badge, Button, Chart, Check, Divider, Meter } from '../kit';
import {
  CRITERIA,
  computeAcademicAverage,
  evaluateAccessConditions,
} from '../data/knowledgeBase';
import type { FactKey, StudentFacts } from '../types/orientation';

interface StudentDetailProps {
  name: string;
  facts: StudentFacts;
  isModified: boolean;
  onUpdateFact: (key: FactKey, value: number) => void;
  onReset: () => void;
}

const GROUP_META: { key: keyof typeof CRITERIA; title: string }[] = [
  { key: 'academic_results', title: 'Academic Results' },
  { key: 'skills', title: 'Skills' },
  { key: 'interests', title: 'Specialty Interests' },
];

export function StudentDetail({
  name,
  facts,
  isModified,
  onUpdateFact,
  onReset,
}: StudentDetailProps) {
  const accessResults = evaluateAccessConditions(facts);
  const accessibleCount = accessResults.filter((r) => r.accessible).length;
  const avg = computeAcademicAverage(facts);

  const profileSeries = [
    facts.Algorithms,
    facts.Programming,
    facts.Mathematics,
    facts.AlgorithmicSkill,
    facts.ProgrammingSkill,
    facts.NetworkSkill,
    facts.AnalyticalSkill,
    facts.InterestAI,
    facts.InterestSE,
    facts.InterestCS,
  ];

  const handleNumberChange = (key: FactKey, raw: string) => {
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    onUpdateFact(key, Math.max(0, Math.min(20, parsed)));
  };

  const stepFact = (key: FactKey, delta: number) => {
    const next = Math.max(0, Math.min(20, Number((facts[key] + delta).toFixed(1))));
    onUpdateFact(key, next);
  };

  return (
    <section className="panel" aria-label={`${name} dossier`}>
      <div className="panel__head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar name={name} size={34} />
          <div>
            <h1 className="panel__title">{name}</h1>
            <p className="panel__subtitle">
              {accessibleCount} accessible specialt{accessibleCount === 1 ? 'y' : 'ies'}
              {isModified ? ' · live edited' : ''}
            </p>
          </div>
        </div>

        <Button
          variant={isModified ? 'primary' : 'secondary'}
          size="medium"
          onClick={isModified ? onReset : undefined}
          style={!isModified ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
        >
          Reset
        </Button>
      </div>

      <div className="detail-body">
        <div className="studio-hero">
          <div className="studio-hero__stats">
            <div className="studio-hero__figure">
              <span className="studio-hero__big">{avg.toFixed(1)}</span>
              <Badge tone={avg >= 14 ? 'success' : avg >= 10 ? 'accent' : 'neutral'}>
                <span className="mono">/ 20</span>
              </Badge>
            </div>
            <span className="studio-hero__caption">
              Academic average (Algorithms, Programming, Mathematics)
            </span>
          </div>

          <div className="studio-hero__chart" aria-label="10-criteria profile curve">
            <Chart data={profileSeries} width={270} height={64} max={20} area dot />
            <div className="studio-hero__chart-labels">
              <span>Grades</span>
              <span>Skills</span>
              <span>Interests</span>
            </div>
          </div>
        </div>

        <div className="criteria-section">
          <h3 className="criteria-section__title">Specialty Access Conditions</h3>
          <div className="access-grid">
            {accessResults.map((item) => (
              <div
                key={item.code}
                className="access-item"
                data-accessible={item.accessible}
                data-specialty={item.code}
              >
                <div className="access-item__top">
                  <span className="access-item__left">
                    <Check on={item.accessible} size={16} />
                    <span className="access-item__code">{item.code}</span>
                  </span>
                  <Badge tone={item.accessible ? 'success' : 'neutral'}>
                    {item.accessible ? 'Accessible' : 'Not met'}
                  </Badge>
                </div>
                <span className="access-item__name">{item.name}</span>
                <div className="access-checks">
                  {item.checks.map((check) => (
                    <div
                      key={check.criterion}
                      className="access-check"
                      data-met={check.met ? 'true' : 'false'}
                    >
                      <span>{check.criterion}</span>
                      <span className="access-check__val">
                        {check.actual} / ≥{check.required}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {GROUP_META.map((group) => {
          const keys = CRITERIA[group.key] as FactKey[];
          return (
            <div key={group.key} className="criteria-section">
              <h3 className="criteria-section__title">{group.title}</h3>
              <div className="fact-rows">
                {keys.map((factKey) => {
                  const value = facts[factKey];
                  const tone = value >= 14 ? 'success' : value >= 10 ? 'accent' : 'ink';
                  return (
                    <div key={factKey} className="fact-row">
                      <span className="fact-row__label">{factKey}</span>
                      <span className="fact-row__meter">
                        <Meter value={value / 20} tone={tone} />
                      </span>
                      <div className="stepper">
                        <button
                          type="button"
                          className="stepper__btn"
                          onClick={() => stepFact(factKey, -0.5)}
                          aria-label={`Decrease ${factKey}`}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          step={0.5}
                          className="stepper__input"
                          value={value}
                          onChange={(e) => handleNumberChange(factKey, e.target.value)}
                          aria-label={`${factKey} for ${name}`}
                        />
                        <button
                          type="button"
                          className="stepper__btn"
                          onClick={() => stepFact(factKey, 0.5)}
                          aria-label={`Increase ${factKey}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
