import arraySample from '@/lib/array-sample';
import generateSeed from '@/lib/generate-seed';
import { DEFAULT_LANGUAGE, LanguageKey, getDictionary, resolveLanguage } from '@/lib/i18n';
import { fetchChampions } from '@/lib/lol-api';
import Link from 'next/link';
import { use } from 'react';
import ChampionGrid from './ChampionGrid';
import LanguageSelector from './LanguageSelector';
import MatchupInsights from './MatchupInsights';
import SeedActions from './SeedActions';
import TeamControls from './TeamControls';
import TeamSummary from './TeamSummary';

export const dynamic = 'force-dynamic';
export const runtime = 'experimental-edge';

interface Props {
  params: {
    seed: string;
  };
  searchParams?: {
    size?: string;
    lang?: string;
  };
}

const DEFAULT_TEAM_SIZE = 15;
const MIN_TEAM_SIZE = 10;
const MAX_TEAM_SIZE = 20;

const clampTeamSize = (value: number) =>
  Math.min(Math.max(value, MIN_TEAM_SIZE), MAX_TEAM_SIZE);

const resolveTeamSize = (rawSize?: string) => {
  if (!rawSize) {
    return DEFAULT_TEAM_SIZE;
  }

  const parsed = Number.parseInt(rawSize, 10);

  if (!Number.isFinite(parsed)) {
    return DEFAULT_TEAM_SIZE;
  }

  return clampTeamSize(parsed);
};

const buildSharePath = (seed: string, teamSize: number, language: LanguageKey) => {
  const params = new URLSearchParams();

  if (teamSize !== DEFAULT_TEAM_SIZE) {
    params.set('size', String(teamSize));
  }

  if (language !== DEFAULT_LANGUAGE) {
    params.set('lang', language);
  }

  const query = params.toString();

  return query ? `/${seed}?${query}` : `/${seed}`;
};

const Page = ({ params, searchParams }: Props) => {
  const data = use(fetchChampions());

  const teamSize = resolveTeamSize(searchParams?.size);
  const poolSize = teamSize * 2;

  const language = resolveLanguage(searchParams?.lang);
  const dictionary = getDictionary(language);

  const pool = arraySample(data, poolSize, params.seed);

  const left = pool.slice(0, Math.floor(poolSize / 2));
  const right = pool.slice(Math.floor(poolSize / 2));

  const sharePath = buildSharePath(params.seed, teamSize, language);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-15%] h-[32rem] w-[120%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.18),_transparent_60%)] blur-3xl" />
        <div className="absolute bottom-[-30%] left-[5%] h-[28rem] w-[50rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.2),_transparent_65%)] blur-3xl" />
      </div>
      <div className="container relative mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-10 p-6 sm:p-10">
        <header className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl font-bold text-yellow-300 drop-shadow-[0_0_18px_rgba(234,179,8,0.45)] sm:text-5xl">
            {dictionary.page.title}
          </h1>
          <p className="max-w-2xl text-sm text-slate-200 sm:text-base">
            {dictionary.page.description}
          </p>
        </header>
        <section className="grid w-full max-w-6xl grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,22rem)_minmax(0,1fr)] xl:items-start">
          <div className="flex w-full flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    {dictionary.page.teamLabel} 1
                  </p>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    {left.length} {dictionary.page.championCountLabel}
                  </h2>
                </div>
                <span className="rounded-full bg-gradient-to-br from-amber-400/90 to-amber-500/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 shadow-lg">
                  {dictionary.page.leftBadge}
                </span>
              </div>
              <ChampionGrid champions={left} roleLabels={dictionary.teamSummary.roleLabels} />
            </div>
            <TeamSummary champions={left} translations={dictionary.teamSummary} />
          </div>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_60px_rgba(8,47,73,0.35)] backdrop-blur">
            <LanguageSelector language={language} translations={dictionary.languageSelector} />
            <SeedActions
              seed={params.seed}
              teamSize={teamSize}
              sharePath={sharePath}
              matchup={{ left, right }}
              translations={dictionary.seedActions}
            />
            <TeamControls
              teamSize={teamSize}
              defaultTeamSize={DEFAULT_TEAM_SIZE}
              minTeamSize={MIN_TEAM_SIZE}
              maxTeamSize={MAX_TEAM_SIZE}
              translations={dictionary.teamControls}
            />
            <MatchupInsights left={left} right={right} translations={dictionary.matchupInsights} />
            <Link
              href={buildSharePath(generateSeed(), teamSize, language)}
              className="btn btn-outline btn-wide"
            >
              {dictionary.page.regenerate}
            </Link>
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.45)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-gradient-to-br from-sky-400/90 to-sky-500/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-slate-950 shadow-lg">
                  {dictionary.page.rightBadge}
                </span>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                    {dictionary.page.teamLabel} 2
                  </p>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                    {right.length} {dictionary.page.championCountLabel}
                  </h2>
                </div>
              </div>
              <ChampionGrid champions={right} roleLabels={dictionary.teamSummary.roleLabels} rtl />
            </div>
            <TeamSummary champions={right} translations={dictionary.teamSummary} />
          </div>
        </section>
      </div>
    </main>
  );
};

export default Page;
