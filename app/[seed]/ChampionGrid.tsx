import {
  Champion,
  CHAMPION_IMAGE_ENDPOINT,
  fetchChampions,
} from '@/lib/lol-api';
import React from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface Props {
  champions: Champion[];
  rtl?: boolean;
}

const ChampionGrid: React.FC<Props> = ({ champions, rtl = false }) => {
  return (
    <ul className={twMerge('grid grid-cols-2 gap-4 p-4', rtl && '[direction:rtl]')}>
      {champions.map((champion) => (
        <li
          key={champion.id}
          className={twMerge('flex w-48 items-center justify-start bg-gray-800 p-2 rounded-lg shadow-md')}
        >
          <div className={twMerge('relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden')}>
            <Image
              src={`${CHAMPION_IMAGE_ENDPOINT}/${champion.image.full}`}
              alt={`${champion.name} splash art`}
              fill
              priority
            />
          </div>
          <h2 className={twMerge('mx-4 text-white font-semibold')}>{champion.name}</h2>
        </li>
      ))}
    </ul>
  );
};

export default ChampionGrid;
