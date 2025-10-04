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
    <section className="flex w-full max-w-xs flex-col items-center gap-3 rounded-lg bg-gray-900/60 p-4 text-center shadow-lg">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-300">
        {translations.heading}
      </h3>
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            className="btn btn-circle btn-xs"
            onClick={handleDecrease}
            disabled={teamSize <= minTeamSize}
            aria-label={translations.decreaseAria}
          >
            –
          </button>
          <div>
            <p className="text-[0.65rem] uppercase tracking-widest text-gray-400">
              {translations.championsPerTeam}
            </p>
            <p className="text-2xl font-bold text-yellow-400">{teamSize}</p>
          </div>
          <button
            type="button"
            className="btn btn-circle btn-xs"
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
        <div className="flex w-full justify-between text-[0.6rem] uppercase tracking-widest text-gray-500">
          <span>{minTeamSize}</span>
          <span>{defaultTeamSize}</span>
          <span>{maxTeamSize}</span>
        </div>
      </div>
      <p className="text-[0.65rem] text-gray-400">
        {translations.helper}
      </p>
    </section>
  );
};

export default TeamControls;
