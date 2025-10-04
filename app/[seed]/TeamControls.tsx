'use client';

import { ChangeEvent, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TeamControlsTranslations } from '@/lib/i18n';

interface TeamControlsProps {
  teamSize: number;
  defaultTeamSize: number;
  minTeamSize: number;
  maxTeamSize: number;
  translations: TeamControlsTranslations;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const TeamControls = ({
  teamSize,
  defaultTeamSize,
  minTeamSize,
  maxTeamSize,
  translations,
}: TeamControlsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pushTeamSize = useCallback(
    (value: number) => {
      const nextSize = clamp(value, minTeamSize, maxTeamSize);
      const params = new URLSearchParams(searchParams?.toString());

      if (nextSize === defaultTeamSize) {
        params.delete('size');
      } else {
        params.set('size', String(nextSize));
      }

      const query = params.toString();
      const target = query ? `${pathname}?${query}` : pathname;

      router.replace(target);
    },
    [defaultTeamSize, maxTeamSize, minTeamSize, pathname, router, searchParams],
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      pushTeamSize(Number(event.target.value));
    },
    [pushTeamSize],
  );

  const handleDecrease = useCallback(() => {
    pushTeamSize(teamSize - 1);
  }, [pushTeamSize, teamSize]);

  const handleIncrease = useCallback(() => {
    pushTeamSize(teamSize + 1);
  }, [pushTeamSize, teamSize]);

  return (
    <section className="flex w-full flex-col items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-900/40 p-6 text-center shadow-[0_20px_45px_rgba(2,6,23,0.55)] backdrop-blur">
      <h3 className="text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-slate-200">
        {translations.heading}
      </h3>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            className="btn btn-circle btn-xs border-white/20 text-lg"
            onClick={handleDecrease}
            disabled={teamSize <= minTeamSize}
            aria-label={translations.decreaseAria}
          >
            –
          </button>
          <div>
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-slate-300">
              {translations.championsPerTeam}
            </p>
            <p className="text-3xl font-bold text-yellow-300 drop-shadow-[0_0_12px_rgba(234,179,8,0.35)]">
              {teamSize}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-circle btn-xs border-white/20 text-lg"
            onClick={handleIncrease}
            disabled={teamSize >= maxTeamSize}
            aria-label={translations.increaseAria}
          >
            +
          </button>
        </div>
        <input
          type="range"
          min={minTeamSize}
          max={maxTeamSize}
          value={teamSize}
          onChange={handleInputChange}
          className="range range-xs"
          aria-label={translations.rangeAria}
        />
        <div className="flex w-full justify-between text-[0.55rem] uppercase tracking-[0.4em] text-slate-400">
          <span>{minTeamSize}</span>
          <span>{defaultTeamSize}</span>
          <span>{maxTeamSize}</span>
        </div>
      </div>
      <p className="text-[0.65rem] text-slate-200/80">
        {translations.helper}
      </p>
    </section>
  );
};

export default TeamControls;
