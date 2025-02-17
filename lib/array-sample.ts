import seedrandom from 'seedrandom';
import generateSeed from './generate-seed';

export default function getRandom<T>(
  arr: Array<T>,
  n: number,
  seed: string = generateSeed(),
): Array<T> {
  var rng = seedrandom(seed);

  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(rng() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
