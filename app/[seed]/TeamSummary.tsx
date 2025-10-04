import { TeamSummaryTranslations } from '@/lib/i18n';
import { Champion } from '@/lib/lol-api';

interface TeamSummaryProps {
  champions: Champion[];
  translations: TeamSummaryTranslations;
}

const toFixed = (value: number) => Math.round(value * 10) / 10;

const TeamSummary = ({ champions, translations }: TeamSummaryProps) => {
  if (champions.length === 0) {
    return null;
  }

  const roleCounts = champions.reduce<Record<string, number>>((counts, champion) => {
    if (!champion.tags || champion.tags.length === 0) {
      counts.Unknown = (counts.Unknown ?? 0) + 1;
      return counts;
    }

    champion.tags.forEach((tag) => {
      counts[tag] = (counts[tag] ?? 0) + 1;
    });

    return counts;
  }, {});

  const sortedRoles = Object.entries(roleCounts).sort(([, left], [, right]) =>
    right - left,
  );

  const averageDifficulty = champions.reduce((total, champion) => {
    return total + (champion.info?.difficulty ?? 0);
  }, 0);

  const difficultyScore = champions.length
    ? toFixed(averageDifficulty / champions.length)
    : 0;

  const maxRoleCount = sortedRoles[0]?.[1] ?? 1;

  return (
    <aside className="w-full rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-left text-sm text-slate-200 shadow-[0_12px_32px_rgba(2,6,23,0.45)] backdrop-blur">
      <h3 className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-300">
        {translations.heading}
      </h3>
      <dl className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3">
          <dt className="text-[0.55rem] uppercase tracking-[0.35em] text-slate-300">
            {translations.uniqueRoles}
          </dt>
          <dd className="text-lg font-semibold text-amber-200 drop-shadow-[0_0_10px_rgba(250,204,21,0.35)]">
            {sortedRoles.length}
          </dd>
        </div>
        <div className="flex flex-col gap-3">
          <dt className="text-[0.55rem] uppercase tracking-[0.35em] text-slate-300">
            {translations.roleDistribution}
          </dt>
          <dd className="flex flex-col gap-2">
            {sortedRoles.map(([role, count]) => {
              const percentage = (count / maxRoleCount) * 100;
              return (
                <div
                  key={role}
                  className="flex items-center gap-3 rounded-lg border border-white/5 bg-slate-900/70 px-3 py-2"
                >
                  <span className="w-24 text-[0.6rem] uppercase tracking-[0.3em] text-slate-300">
                    {translations.roleLabels[role] ?? role}
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-800/70">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-amber-100">{count}</span>
                </div>
              );
            })}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-emerald-400/10 px-4 py-3">
          <dt className="text-[0.55rem] uppercase tracking-[0.35em] text-slate-300">
            {translations.averageDifficulty}
          </dt>
          <dd className="text-lg font-semibold text-emerald-200">
            {difficultyScore}
          </dd>
        </div>
      </dl>
    </aside>
  );
};

export default TeamSummary;
