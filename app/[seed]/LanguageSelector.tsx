'use client';

import { ChangeEvent, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  DEFAULT_LANGUAGE,
  LanguageKey,
  LanguageSelectorTranslations,
} from '@/lib/i18n';

interface LanguageSelectorProps {
  language: LanguageKey;
  translations: LanguageSelectorTranslations;
}

const LanguageSelector = ({ language, translations }: LanguageSelectorProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const nextLanguage = event.target.value as LanguageKey;
      const params = new URLSearchParams(searchParams?.toString());

      if (nextLanguage === DEFAULT_LANGUAGE) {
        params.delete('lang');
      } else {
        params.set('lang', nextLanguage);
      }

      const query = params.toString();
      const target = query ? `${pathname}?${query}` : pathname;

      router.replace(target);
    },
    [pathname, router, searchParams],
  );

  return (
    <label className="flex w-full flex-col gap-2 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-left text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-slate-200 shadow-[0_12px_28px_rgba(2,6,23,0.45)]">
      <span>{translations.label}</span>
      <select
        value={language}
        onChange={handleChange}
        className="select select-sm w-full border border-white/10 bg-slate-900/80 text-xs uppercase tracking-[0.2em] text-slate-100"
        aria-label={translations.label}
      >
        {Object.entries(translations.options).map(([value, label]) => (
          <option key={value} value={value} className="text-base normal-case">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default LanguageSelector;
