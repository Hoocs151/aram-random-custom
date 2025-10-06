import seedrandom from 'seedrandom';
import generateSeed from './generate-seed';

export default function getRandom<T>(
  arr: readonly T[],
  n: number,
  seed: string = generateSeed(),
): T[] {
  if (!Number.isInteger(n) || n < 0) {
    throw new RangeError('getRandom: n must be a non-negative integer');
  }

  const len = arr.length;

  if (n > len) {
    throw new RangeError('getRandom: more elements taken than available');
  }

  const rng = seedrandom(seed);
  const result = new Array<T>(n);
  const taken = new Array<number>(len);
  let remaining = len;

  for (let index = n - 1; index >= 0; index -= 1) {
    const randomIndex = Math.floor(rng() * remaining);
    const selectedIndex = taken[randomIndex] ?? randomIndex;

    result[index] = arr[selectedIndex];

    remaining -= 1;
    taken[randomIndex] = taken[remaining] ?? remaining;
  }

  return result;
}
