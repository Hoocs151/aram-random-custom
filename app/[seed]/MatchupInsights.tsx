import { MatchupInsightsTranslations } from '@/lib/i18n';
import { Champion } from '@/lib/lol-api';

interface MatchupInsightsProps {
  left: Champion[];
  right: Champion[];
  translations: MatchupInsightsTranslations;
}

const METRICS = ['attack', 'defense', 'magic', 'difficulty'] as const;

type MetricKey = (typeof METRICS)[number];

const toFixed = (value: number) => Math.round(value * 10) / 10;

const getAverage = (team: Champion[], key: MetricKey) => {
  if (team.length === 0) {
    return 0;
  }

  const total = team.reduce((sum, champion) => {
    const stat = champion.info?.[key] ?? 0;
    return sum + stat;
  }, 0);

  return toFixed(total / team.length);
};

const MatchupInsights = ({ left, right, translations }: MatchupInsightsProps) => {
  if (!left.length && !right.length) {
    return null;
  }

  return (
    <section className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-left text-sm text-slate-200 shadow-[0_15px_40px_rgba(8,47,73,0.35)] backdrop-blur">
      <div>
        <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-200">
          {translations.heading}
        </h3>
        <p className="mt-2 text-[0.65rem] text-slate-300/80">{translations.helper}</p>
      </div>
      <dl className="flex flex-col gap-4">
        {METRICS.map((metric) => {
          const leftAverage = getAverage(left, metric);
          const rightAverage = getAverage(right, metric);
          const maxValue = Math.max(leftAverage, rightAverage, 1);
          const leftRatio = Math.max(0, Math.min((leftAverage / maxValue) * 100, 100));
          const rightRatio = Math.max(0, Math.min((rightAverage / maxValue) * 100, 100));

          return (
            <div key={metric} className="flex flex-col gap-2">
              <dt className="text-[0.55rem] uppercase tracking-[0.35em] text-slate-300">
                {translations.metrics[metric]}
              </dt>
              <dd className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[0.55rem] uppercase tracking-[0.35em] text-amber-200/80">
                    {translations.leftLabel}
                  </span>
                  <span className="text-sm font-semibold text-amber-200">
                    {leftAverage.toFixed(1)}
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-800/70">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500"
                    style={{ width: `${leftRatio}%` }}
                  />
                  <span
                    className="absolute inset-y-0 right-0 rounded-full bg-gradient-to-l from-sky-200 via-sky-300 to-sky-500"
                    style={{ width: `${rightRatio}%` }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.55rem] uppercase tracking-[0.35em] text-sky-200/80">
                    {translations.rightLabel}
                  </span>
                  <span className="text-sm font-semibold text-sky-200">
                    {rightAverage.toFixed(1)}
                  </span>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
};

export default MatchupInsights;
