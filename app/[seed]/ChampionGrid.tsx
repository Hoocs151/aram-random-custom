import { Champion, getChampionImageUrl } from '@/lib/lol-api';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
  champions: Champion[];
  roleLabels: Record<string, string>;
  rtl?: boolean;
}

const ChampionGrid = ({ champions, roleLabels, rtl = false }: Props) => {
  return (
    <ul
      className={twMerge(
        'grid grid-cols-1 gap-4 p-4 sm:grid-cols-2',
        rtl && '[direction:rtl]',
      )}
    >
      {champions.map((champion, index) => (
        <li
          key={champion.id}
          className={twMerge(
            'flex w-full items-center justify-start rounded-lg bg-gray-800 p-3 shadow-md',
          )}
        >
          <div className={twMerge('relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md')}>
            <Image
              src={getChampionImageUrl(champion)}
              alt={`${champion.name} splash art`}
              fill
              priority={index < 4}
              sizes="4rem"
              unoptimized
            />
          </div>
          <div className="ml-4 flex flex-col gap-1">
            <h2 className="text-sm font-semibold text-white sm:text-base">
              {champion.name}
            </h2>
            {champion.tags?.length ? (
              <div className="flex flex-wrap gap-1">
                {champion.tags.map((tag) => (
                  <span
                    key={`${champion.id}-${tag}`}
                    className="badge badge-outline badge-sm text-xs uppercase tracking-wide text-yellow-300"
                  >
                    {roleLabels[tag] ?? tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChampionGrid;
