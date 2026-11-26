import { useEffect, useMemo, useState } from 'react';
import { buildAllFacts } from './data/knowledgeBase';
import { TopBar } from './components/TopBar';
import { StudentList, type SpecialtyFilter } from './components/StudentList';
import { StudentDetail } from './components/StudentDetail';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import type { FactKey, StudentFacts, WorkspaceView } from './types/orientation';

const INITIAL_FACTS = buildAllFacts();
const STUDENT_NAMES = Object.keys(INITIAL_FACTS);

function readInitialView(): WorkspaceView {
  const params = new URLSearchParams(window.location.search);
  const v = params.get('view');
  if (v === 'knowledge' || v === 'students') return v;
  return 'students';
}

function readInitialStudent(): string {
  const params = new URLSearchParams(window.location.search);
  const s = params.get('student');
  if (s && s in INITIAL_FACTS) return s;
  return STUDENT_NAMES[0] ?? '';
}

export function App() {
  const [view, setView] = useState<WorkspaceView>(readInitialView);
  const [dark, setDark] = useState(true);
  const [students, setStudents] = useState<Record<string, StudentFacts>>(() =>
    structuredClone(INITIAL_FACTS),
  );
  const [selectedName, setSelectedName] = useState<string>(readInitialStudent);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<SpecialtyFilter>('ALL');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('view', view);
    if (selectedName) params.set('student', selectedName);
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', nextUrl);
  }, [view, selectedName]);

  const currentFacts = students[selectedName] ?? INITIAL_FACTS[STUDENT_NAMES[0]];

  const isModified = useMemo(() => {
    const base = INITIAL_FACTS[selectedName];
    if (!base || !currentFacts) return false;
    return (Object.keys(base) as FactKey[]).some((k) => base[k] !== currentFacts[k]);
  }, [selectedName, currentFacts]);

  const handleUpdateFact = (key: FactKey, value: number) => {
    setStudents((prev) => ({
      ...prev,
      [selectedName]: {
        ...prev[selectedName],
        [key]: value,
      },
    }));
  };

  const handleResetStudent = () => {
    const base = INITIAL_FACTS[selectedName];
    if (!base) return;
    setStudents((prev) => ({
      ...prev,
      [selectedName]: { ...base },
    }));
  };

  return (
    <div className="app-shell look-rcr" data-theme={dark ? 'dark' : 'light'}>
      <TopBar
        view={view}
        onChangeView={setView}
        studentCount={STUDENT_NAMES.length}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
      />

      <main className="workspace">
        {view === 'students' && currentFacts && (
          <div className="students-grid">
            <StudentList
              students={students}
              selectedName={selectedName}
              onSelect={setSelectedName}
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
            <StudentDetail
              name={selectedName}
              facts={currentFacts}
              isModified={isModified}
              onUpdateFact={handleUpdateFact}
              onReset={handleResetStudent}
            />
          </div>
        )}

        {view === 'knowledge' && <KnowledgeBaseView />}
      </main>
    </div>
  );
}

export default App;
