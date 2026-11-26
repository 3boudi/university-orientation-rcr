import { Avatar, Badge, Icon, Row, Segmented } from '../kit';
import { computeAcademicAverage, evaluateAccessConditions } from '../data/knowledgeBase';
import type { SpecialtyCode, StudentFacts } from '../types/orientation';

export type SpecialtyFilter = 'ALL' | SpecialtyCode;

interface StudentListProps {
  students: Record<string, StudentFacts>;
  selectedName: string;
  onSelect: (name: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  filter: SpecialtyFilter;
  onFilterChange: (value: SpecialtyFilter) => void;
}

const FILTERS: { id: SpecialtyFilter; label: string }[] = [
  { id: 'ALL', label: 'All' },
  { id: 'AI', label: 'AI' },
  { id: 'SE', label: 'SE' },
  { id: 'CS', label: 'CS' },
];

export function StudentList({
  students,
  selectedName,
  onSelect,
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: StudentListProps) {
  const entries = Object.entries(students).filter(([name, facts]) => {
    const matchesSearch = name.toLowerCase().includes(search.trim().toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'ALL') return true;
    const access = evaluateAccessConditions(facts);
    return access.some((item) => item.code === filter && item.accessible);
  });

  const filterIndex = Math.max(
    0,
    FILTERS.findIndex((f) => f.id === filter),
  );

  return (
    <section className="panel" aria-label="Student register">
      <div className="panel__head">
        <div>
          <h2 className="panel__title">Student Profiles</h2>
          <p className="panel__subtitle">
            {entries.length} of {Object.keys(students).length} shown
          </p>
        </div>
      </div>

      <div className="panel__controls">
        <div className="search-box">
          <span className="search-box__icon">
            <Icon name="search" size={14} />
          </span>
          <input
            type="search"
            className="search-box__input"
            placeholder="Filter by name..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Filter students by name"
          />
        </div>

        <Segmented
          value={filterIndex}
          items={FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="seg-btn"
              aria-pressed={filter === item.id}
              onClick={() => onFilterChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        />
      </div>

      <div className="student-list" role="list">
        {entries.length === 0 ? (
          <div className="empty-state">No students match this filter.</div>
        ) : (
          entries.map(([name, facts]) => {
            const access = evaluateAccessConditions(facts);
            const accessibleCodes = access.filter((a) => a.accessible).map((a) => a.code);
            const avg = computeAcademicAverage(facts);

            return (
              <button
                key={name}
                type="button"
                className="student-row-btn"
                onClick={() => onSelect(name)}
                aria-current={selectedName === name ? 'true' : undefined}
              >
                <Row
                  pad={10}
                  selected={selectedName === name}
                  lead={<Avatar name={name} size={28} />}
                  title={name}
                  subtitle={
                    accessibleCodes.length > 0
                      ? `Access: ${accessibleCodes.join(', ')}`
                      : 'No direct access'
                  }
                  meta={
                    <Badge tone={accessibleCodes.length > 0 ? 'accent' : 'neutral'}>
                      <span className="mono">{avg.toFixed(1)}</span>
                    </Badge>
                  }
                />
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
