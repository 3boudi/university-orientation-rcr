import { useState } from 'react';
import { Badge, Icon, Segmented } from '../kit';
import {
  ACCESS_CONDITIONS,
  BASE_RULES,
  CRITERIA,
  SPECIALTIES,
  SPECIALTY_CODES,
} from '../data/knowledgeBase';

type RuleFilter = 'all' | 'access' | 'recommendation';

const RULE_FILTERS: { id: RuleFilter; label: string }[] = [
  { id: 'all', label: 'All (6)' },
  { id: 'access', label: 'Access' },
  { id: 'recommendation', label: 'Recommendation' },
];

export function KnowledgeBaseView() {
  const [ruleFilter, setRuleFilter] = useState<RuleFilter>('all');

  const filteredRules = BASE_RULES.filter((rule) =>
    ruleFilter === 'all' ? true : rule.category === ruleFilter,
  );

  const filterIndex = Math.max(
    0,
    RULE_FILTERS.findIndex((f) => f.id === ruleFilter),
  );

  return (
    <div className="kb-stack">
      {/* 1. Specialties & Access Conditions */}
      <section className="panel">
        <div className="panel__head">
          <div>
            <h2 className="panel__title">Specialties & Access Conditions</h2>
            <p className="panel__subtitle">
              3 target specialties and their minimum admission thresholds (/20)
            </p>
          </div>
          <Badge tone="neutral">
            <span className="mono">{SPECIALTY_CODES.length}</span> tracks
          </Badge>
        </div>

        <div className="kb-specialties">
          {SPECIALTY_CODES.map((code) => {
            const thresholds = Object.entries(ACCESS_CONDITIONS[code]);
            return (
              <div key={code} className="kb-spec-card">
                <div className="kb-spec-card__head">
                  <span className="kb-spec-card__code">{code}</span>
                  <Badge tone="neutral">Min. thresholds</Badge>
                </div>
                <div className="kb-spec-card__name">{SPECIALTIES[code]}</div>
                <div className="kb-spec-card__chips">
                  {thresholds.map(([criterion, min]) => (
                    <span key={criterion} className="kb-chip">
                      <span>{criterion}</span>
                      <span className="kb-chip__val">≥ {min}</span>
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Orientation Criteria */}
      <section className="panel">
        <div className="panel__head">
          <div>
            <h2 className="panel__title">Orientation Criteria</h2>
            <p className="panel__subtitle">
              10 modeled student attributes grouped across 3 dimensions
            </p>
          </div>
          <Badge tone="neutral">
            <span className="mono">0 – 20</span> scale
          </Badge>
        </div>

        <div className="kb-criteria-grid">
          <div className="kb-crit-group">
            <div className="kb-crit-group__head">
              <span className="kb-crit-group__title">Academic Results</span>
              <span className="kb-crit-group__count mono">
                {CRITERIA.academic_results.length}
              </span>
            </div>
            <div className="kb-crit-group__pills">
              {CRITERIA.academic_results.map((attr) => (
                <span key={attr} className="kb-attr-pill">
                  {attr}
                </span>
              ))}
            </div>
          </div>

          <div className="kb-crit-group">
            <div className="kb-crit-group__head">
              <span className="kb-crit-group__title">Skills</span>
              <span className="kb-crit-group__count mono">
                {CRITERIA.skills.length}
              </span>
            </div>
            <div className="kb-crit-group__pills">
              {CRITERIA.skills.map((attr) => (
                <span key={attr} className="kb-attr-pill">
                  {attr}
                </span>
              ))}
            </div>
          </div>

          <div className="kb-crit-group">
            <div className="kb-crit-group__head">
              <span className="kb-crit-group__title">Specialty Interests</span>
              <span className="kb-crit-group__count mono">
                {CRITERIA.interests.length}
              </span>
            </div>
            <div className="kb-crit-group__pills">
              {CRITERIA.interests.map((attr) => (
                <span key={attr} className="kb-attr-pill">
                  {attr}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. System Base Rules */}
      <section className="panel">
        <div className="panel__head">
          <div>
            <h2 className="panel__title">System Base Rules</h2>
            <p className="panel__subtitle">
              Formal propositional & predicate rules from <span className="mono">rules.py</span>
            </p>
          </div>

          <div style={{ width: 280, maxWidth: '100%' }}>
            <Segmented
              value={filterIndex}
              items={RULE_FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="seg-btn"
                  aria-pressed={ruleFilter === item.id}
                  onClick={() => setRuleFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            />
          </div>
        </div>

        <div className="kb-rules-list">
          {filteredRules.map((rule) => {
            const [rawPremises, rawConclusion] = rule.formula.split('=>').map((s) => s.trim());
            const premises = rawPremises.split('AND').map((s) => s.trim());

            return (
              <div key={rule.id} className="kb-rule-row">
                <div className="kb-rule-row__id">
                  <span className="kb-rule-code">{rule.id}</span>
                  <Badge tone={rule.category === 'recommendation' ? 'accent' : 'neutral'}>
                    {rule.category === 'recommendation' ? 'Recommendation' : 'Access'}
                  </Badge>
                </div>

                <div className="kb-rule-row__expr">
                  <div className="kb-rule-row__premises">
                    {premises.map((cond, idx) => (
                      <span key={cond} className="kb-rule-cond">
                        {idx > 0 && <span className="kb-rule-op">AND</span>}
                        <span className="kb-cond-pill">{cond}</span>
                      </span>
                    ))}
                  </div>

                  <span className="kb-rule-arrow" aria-hidden="true">
                    <Icon name="arrow" size={14} />
                  </span>

                  <span
                    className="kb-conclusion-pill"
                    data-kind={rule.category}
                  >
                    {rawConclusion}
                  </span>
                </div>

                <div className="kb-rule-row__target">
                  <Badge tone="neutral">
                    <span className="mono">{rule.specialty}</span>
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
