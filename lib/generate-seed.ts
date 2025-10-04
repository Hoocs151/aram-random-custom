const DEFAULT_LENGTH = 15;
const DEFAULT_CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

type CryptoEnabledGlobal = typeof globalThis & {
  crypto?: Crypto;
};

const getRandomValues = (length: number): Uint8Array => {
  const cryptoObj = (globalThis as CryptoEnabledGlobal).crypto;

  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    const buffer = new Uint8Array(length);
    cryptoObj.getRandomValues(buffer);
    return buffer;
  }

  // Fallback to Math.random when crypto is unavailable (e.g. certain test environments).
  const fallbackBuffer = new Uint8Array(length);
  for (let index = 0; index < length; index += 1) {
    fallbackBuffer[index] = Math.floor(Math.random() * 256);
  }
  return fallbackBuffer;
};

export default function generateSeed(
  length = DEFAULT_LENGTH,
  characters = DEFAULT_CHARSET,
): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new RangeError('generateSeed: length must be a positive integer');
  }

  if (!characters || characters.length === 0) {
    throw new RangeError('generateSeed: characters cannot be empty');
  }

  const characterCount = characters.length;
  const randomValues = getRandomValues(length);

  return Array.from(randomValues, (value) =>
    characters.charAt(value % characterCount),
  ).join('');
}
