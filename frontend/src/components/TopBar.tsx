import { Badge, Tabs, Toggle } from '../kit';
import type { WorkspaceView } from '../types/orientation';

interface TopBarProps {
  view: WorkspaceView;
  onChangeView: (view: WorkspaceView) => void;
  studentCount: number;
  dark: boolean;
  onToggleDark: () => void;
}

const NAV_ITEMS: { id: WorkspaceView; label: string }[] = [
  { id: 'students', label: 'Students' },
  { id: 'knowledge', label: 'Specialties & Rules' },
];

export function TopBar({
  view,
  onChangeView,
  studentCount,
  dark,
  onToggleDark,
}: TopBarProps) {
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === view),
  );

  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="topbar__brand">
          <span className="topbar__title">University Orientation · KRR</span>
          <Badge tone="neutral">
            <span className="mono">{studentCount}</span> profiles
          </Badge>
        </div>

        <div className="topbar__right">
          <nav aria-label="Main navigation">
            <Tabs
              value={activeIndex}
              items={NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="tab-trigger"
                  aria-current={view === item.id ? 'page' : undefined}
                  onClick={() => onChangeView(item.id)}
                >
                  {item.label}
                </button>
              ))}
            />
          </nav>

          <button
            type="button"
            className="theme-switch"
            onClick={onToggleDark}
            aria-label="Toggle light or dark theme"
          >
            <span>Dark</span>
            <Toggle on={dark} />
          </button>
        </div>
      </div>
    </header>
  );
}
