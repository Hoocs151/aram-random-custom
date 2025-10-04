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
        'grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4',
        rtl && 'xl:[direction:rtl] xl:text-right',
      )}
    >
      {champions.map((champion, index) => (
        <li
          key={champion.id}
          className={twMerge(
            'group relative flex w-full items-center justify-start gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-3 shadow-[0_15px_35px_rgba(2,6,23,0.45)] transition-transform duration-200 hover:-translate-y-1 hover:border-amber-300/40',
            rtl && 'flex-row-reverse text-right'
          )}
        >
          <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(250,204,21,0.2),_transparent_65%)]" />
          </div>
          <span
            className={twMerge(
              'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-amber-300/40 bg-slate-950/80 text-xs font-bold uppercase tracking-[0.2em] text-amber-200 shadow-inner',
              rtl && 'order-3'
            )}
          >
            {index + 1}
          </span>
          <div
            className={twMerge(
              'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950/60 shadow-inner',
              rtl && 'order-2'
            )}
          >
            <Image
              src={getChampionImageUrl(champion)}
              alt={`${champion.name} splash art`}
              fill
              priority={index < 4}
              sizes="4rem"
              unoptimized
            />
          </div>
          <div
            className={twMerge(
              'flex min-w-0 flex-1 flex-col gap-1',
              rtl ? 'items-end text-right' : 'items-start text-left'
            )}
          >
            <h2 className="truncate text-sm font-semibold text-white sm:text-base">
              {champion.name}
            </h2>
            {champion.tags?.length ? (
              <div className={twMerge('flex flex-wrap gap-1', rtl && 'justify-end')}>
                {champion.tags.map((tag) => (
                  <span
                    key={`${champion.id}-${tag}`}
                    className="badge badge-outline badge-sm border-amber-200/40 bg-slate-950/60 text-[0.6rem] uppercase tracking-wide text-amber-100"
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
