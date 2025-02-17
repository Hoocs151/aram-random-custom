export const CHAMPION_ENDPOINT =
  'https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json';

export const CHAMPION_IMAGE_ENDPOINT =
  'https://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion';

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
  tags: number[];
};

let cache: Champion[] | undefined = undefined;

export const fetchChampions = async (): Promise<Champion[]> => {
  if (!cache) {
    console.log('Populating cache');
    const response = await fetch(CHAMPION_ENDPOINT);
    const data = await response.json();

    const champions = Object.values(data.data) as Champion[];

    cache = champions;
  }

  return cache;
};
