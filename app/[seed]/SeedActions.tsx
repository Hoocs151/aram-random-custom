'use client';

import { SeedActionsTranslations } from '@/lib/i18n';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface SeedActionsProps {
  seed: string;
  teamSize: number;
  sharePath: string;
  matchup: {
    left: { name: string }[];
    right: { name: string }[];
  };
  translations: SeedActionsTranslations;
}

type FeedbackState = {
  message: string;
  tone: 'success' | 'error';
};

const FEEDBACK_DURATION_MS = 2500;

type ShareCapableNavigator = Navigator & {
  share: (data?: ShareData) => Promise<void>;
};

const canShare = (nav: Navigator): nav is ShareCapableNavigator =>
  typeof (nav as ShareCapableNavigator).share === 'function';

const buildMatchupSummary = (
  seed: string,
  teamSize: number,
  matchup: SeedActionsProps['matchup'],
  summaryTranslations: SeedActionsTranslations['summary'],
): string => {
  const lines = [
    `${summaryTranslations.seed}: ${seed}`,
    `${summaryTranslations.championsPerTeam}: ${teamSize}`,
    '',
    `${summaryTranslations.teamLabel} 1 (${matchup.left.length}): ${matchup.left
      .map((champion) => champion.name)
      .join(', ')}`,
    `${summaryTranslations.teamLabel} 2 (${matchup.right.length}): ${matchup.right
      .map((champion) => champion.name)
      .join(', ')}`,
  ];

  return lines.join('\n');
};

const SeedActions: React.FC<SeedActionsProps> = ({
  seed,
  teamSize,
  sharePath,
  matchup,
  translations,
}) => {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const resetTimeoutRef = useRef<number>();

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return sharePath;
    }

    const origin = window.location.origin.replace(/\/$/, '');
    return `${origin}${sharePath}`;
  }, [sharePath]);

  const matchupSummary = useMemo(
    () => buildMatchupSummary(seed, teamSize, matchup, translations.summary),
    [seed, teamSize, matchup, translations],
  );

  const scheduleFeedbackReset = useCallback(() => {
    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setFeedback(null);
    }, FEEDBACK_DURATION_MS);
  }, []);

  const showFeedback = useCallback((message: string, tone: FeedbackState['tone']) => {
    setFeedback({ message, tone });
    scheduleFeedbackReset();
  }, [scheduleFeedbackReset]);

  const handleCopy = useCallback(async () => {
    try {
      if (!navigator.clipboard) {
        showFeedback(translations.clipboardUnavailable, 'error');
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      showFeedback(translations.seedCopied, 'success');
    } catch (error) {
      console.error('Failed to copy seed', error);
      showFeedback(translations.seedCopyError, 'error');
    }
  }, [shareUrl, showFeedback, translations]);

  const handleCopyMatchup = useCallback(async () => {
    try {
      if (!navigator.clipboard) {
        showFeedback(translations.clipboardUnavailable, 'error');
        return;
      }

      await navigator.clipboard.writeText(matchupSummary);
      showFeedback(translations.matchupCopied, 'success');
    } catch (error) {
      console.error('Failed to copy matchup', error);
      showFeedback(translations.matchupCopyError, 'error');
    }
  }, [matchupSummary, showFeedback, translations]);

  const handleShare = useCallback(async () => {
    try {
      if (canShare(navigator)) {
        await navigator.share({
          url: shareUrl,
          text: matchupSummary,
          title: translations.shareTitle,
        });
        showFeedback(translations.shareSuccess, 'success');
        return;
      }

      await handleCopy();
    } catch (error) {
      console.error('Failed to share seed', error);
      showFeedback(translations.shareFailure, 'error');
    }
  }, [handleCopy, shareUrl, matchupSummary, showFeedback, translations]);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center shadow-[0_15px_40px_rgba(8,47,73,0.35)]">
      <p className="text-[0.6rem] uppercase tracking-[0.4em] text-slate-200">
        {translations.seedLabel}
      </p>
      <code className="rounded-full border border-amber-200/40 bg-slate-950/70 px-4 py-2 text-sm font-semibold tracking-widest text-amber-200 shadow-inner sm:text-base">
        {seed}
      </code>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className="btn btn-outline btn-sm border-amber-200/60 text-amber-200 hover:border-amber-100 hover:bg-amber-300/10"
          onClick={handleCopy}
        >
          {translations.copyLink}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm border-white/30 text-slate-100 hover:border-white/60 hover:bg-slate-800/60"
          onClick={handleShare}
        >
          {translations.share}
        </button>
        <button
          type="button"
          className="btn btn-outline btn-sm border-white/30 text-slate-100 hover:border-white/60 hover:bg-slate-800/60"
          onClick={handleCopyMatchup}
        >
          {translations.copyMatchup}
        </button>
      </div>
      {feedback ? (
        <p
          className={
            feedback.tone === 'success'
              ? 'text-xs font-medium text-emerald-300'
              : 'text-xs font-medium text-rose-300'
          }
        >
          {feedback.message}
        </p>
      ) : null}
    </div>
  );
};

export default SeedActions;
