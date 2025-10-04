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

  return (
    <aside className="w-full rounded-md border border-gray-800 bg-gray-900/60 p-3 text-left text-sm text-gray-300">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
        {translations.heading}
      </h3>
      <dl className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[0.65rem] uppercase tracking-widest text-gray-400">
            {translations.uniqueRoles}
          </dt>
          <dd className="text-sm font-semibold text-yellow-300">
            {sortedRoles.length}
          </dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-[0.65rem] uppercase tracking-widest text-gray-400">
            {translations.roleDistribution}
          </dt>
          <dd className="flex flex-wrap gap-1">
            {sortedRoles.map(([role, count]) => (
              <span
                key={role}
                className="badge badge-outline badge-xs text-[0.6rem] uppercase tracking-wide text-gray-200"
              >
                {translations.roleLabels[role] ?? role}: {count}
              </span>
            ))}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-[0.65rem] uppercase tracking-widest text-gray-400">
            {translations.averageDifficulty}
          </dt>
          <dd className="text-sm font-semibold text-emerald-300">
            {difficultyScore}
          </dd>
        </div>
      </dl>
    </aside>
  );
};

export default TeamSummary;
