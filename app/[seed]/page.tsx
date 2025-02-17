import arraySample from '@/lib/array-sample';
import generateSeed from '@/lib/generate-seed';
import { fetchChampions } from '@/lib/lol-api';
import Link from 'next/link';
import { use } from 'react';
import ChampionGrid from './ChampionGrid';

export const dynamic = 'force-dynamic';
export const runtime = 'experimental-edge';

interface Props {
  params: {
    seed: string;
  };
}

const poolSize = 20;

const Page: React.FC<Props> = ({ params }) => {
  const data = use(fetchChampions());

  const pool = arraySample(data, poolSize, params.seed);

  const left = pool.slice(0, Math.floor(poolSize / 2));
  const right = pool.slice(Math.floor(poolSize / 2));

  return (
    <main className="container mx-auto flex min-h-screen w-full items-center justify-center p-8">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Team 1</h2>
        <ChampionGrid champions={left} />
      </div>
      <div className="mx-8 flex flex-col items-center justify-center gap-4">
        <Link href={`/${generateSeed()}`} className="btn btn-outline btn-sm">
          Regenerate
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold text-white mb-4">Team 2</h2>
        <ChampionGrid champions={right} rtl />
      </div>
    </main>
  );
};

export default Page;
