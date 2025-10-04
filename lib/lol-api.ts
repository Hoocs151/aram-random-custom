import staticChampionData from './static-champions.json';

const PATCH_VERSION = '13.19.1';
const BASE_ENDPOINT = `https://ddragon.leagueoflegends.com/cdn/${PATCH_VERSION}`;

export const CHAMPION_ENDPOINT = `${BASE_ENDPOINT}/data/en_US/champion.json`;

export const CHAMPION_IMAGE_ENDPOINT = `${BASE_ENDPOINT}/img/champion`;

export type Champion = {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: {
    attack: number;
    defense: number;
    magic: number;
    difficulty: number;
  };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
};

const FALLBACK_CHAMPIONS = staticChampionData as Champion[];

let cache: Champion[] | undefined = undefined;

export const fetchChampions = async (): Promise<Champion[]> => {
  if (cache) {
    return cache;
  }

  console.log('Populating cache');

  try {
    const response = await fetch(CHAMPION_ENDPOINT, {
      // Ensure the data is always fresh while still allowing Next.js to cache the response for the request lifecycle.
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch champions: ${response.statusText}`);
    }

    type ChampionResponse = {
      data: Record<string, Champion>;
    };

    const data = (await response.json()) as ChampionResponse;

    const champions = Object.values(data.data).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    cache = champions;
  } catch (error) {
    console.error('Falling back to bundled champion data', error);
    cache = [...FALLBACK_CHAMPIONS].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  return cache;
};

export const getChampionImageUrl = (champion: Pick<Champion, 'image'>): string =>
  `${CHAMPION_IMAGE_ENDPOINT}/${champion.image.full}`;
