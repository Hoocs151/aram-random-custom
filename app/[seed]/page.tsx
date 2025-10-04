import arraySample from '@/lib/array-sample';
import generateSeed from '@/lib/generate-seed';
import { DEFAULT_LANGUAGE, LanguageKey, getDictionary, resolveLanguage } from '@/lib/i18n';
import { fetchChampions } from '@/lib/lol-api';
import Link from 'next/link';
import { use } from 'react';
import ChampionGrid from './ChampionGrid';
import LanguageSelector from './LanguageSelector';
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

const DEFAULT_TEAM_SIZE = 5;
const MIN_TEAM_SIZE = 3;
const MAX_TEAM_SIZE = 6;

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
    <main className="container mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-8 p-6 sm:p-10">
      <header className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-yellow-500 sm:text-4xl">
          {dictionary.page.title}
        </h1>
        <p className="max-w-xl text-sm text-gray-300 sm:text-base">
          {dictionary.page.description}
        </p>
      </header>
      <section className="flex w-full flex-col items-center justify-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            {`${dictionary.page.teamLabel} 1`}
          </h2>
          <ChampionGrid champions={left} roleLabels={dictionary.teamSummary.roleLabels} />
          <TeamSummary champions={left} translations={dictionary.teamSummary} />
        </div>
        <div className="flex flex-col items-center gap-6">
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
          <Link
            href={buildSharePath(generateSeed(), teamSize, language)}
            className="btn btn-outline"
          >
            {dictionary.page.regenerate}
          </Link>
        </div>
        <div className="flex w-full max-w-md flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            {`${dictionary.page.teamLabel} 2`}
          </h2>
          <ChampionGrid champions={right} roleLabels={dictionary.teamSummary.roleLabels} rtl />
          <TeamSummary champions={right} translations={dictionary.teamSummary} />
        </div>
      </section>
    </main>
  );
};

export default Page;
