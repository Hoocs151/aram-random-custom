import generateSeed from '@/lib/generate-seed';
import { redirect } from 'next/navigation';

export const runtime = 'experimental-edge';
export const dynamic = 'force-dynamic';

export default function Page() {
  const seed = generateSeed();

  redirect(`/${seed}`);
}
