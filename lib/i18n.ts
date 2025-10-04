export const SUPPORTED_LANGUAGES = ['en', 'vi'] as const;

export type LanguageKey = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: LanguageKey = 'en';

const roleLabels: Record<LanguageKey, Record<string, string>> = {
  en: {
    Assassin: 'Assassin',
    Fighter: 'Fighter',
    Mage: 'Mage',
    Marksman: 'Marksman',
    Support: 'Support',
    Tank: 'Tank',
    Unknown: 'Unknown',
  },
  vi: {
    Assassin: 'Sát thủ',
    Fighter: 'Đấu sĩ',
    Mage: 'Pháp sư',
    Marksman: 'Xạ thủ',
    Support: 'Hỗ trợ',
    Tank: 'Đỡ đòn',
    Unknown: 'Không xác định',
  },
};

export type SeedActionsTranslations = {
  seedLabel: string;
  copyLink: string;
  share: string;
  copyMatchup: string;
  clipboardUnavailable: string;
  seedCopied: string;
  seedCopyError: string;
  matchupCopied: string;
  matchupCopyError: string;
  shareSuccess: string;
  shareFailure: string;
  shareTitle: string;
  summary: {
    seed: string;
    championsPerTeam: string;
    teamLabel: string;
  };
};

export type TeamControlsTranslations = {
  heading: string;
  championsPerTeam: string;
  decreaseAria: string;
  increaseAria: string;
  rangeAria: string;
  helper: string;
};

export type TeamSummaryTranslations = {
  heading: string;
  uniqueRoles: string;
  roleDistribution: string;
  averageDifficulty: string;
  roleLabels: Record<string, string>;
};

export type LanguageSelectorTranslations = {
  label: string;
  options: Record<LanguageKey, string>;
};

export type PageTranslations = {
  title: string;
  description: string;
  teamLabel: string;
  regenerate: string;
  championCountLabel: string;
  leftBadge: string;
  rightBadge: string;
};

export type Dictionary = {
  page: PageTranslations;
  seedActions: SeedActionsTranslations;
  teamControls: TeamControlsTranslations;
  teamSummary: TeamSummaryTranslations;
  languageSelector: LanguageSelectorTranslations;
};

export const DICTIONARY: Record<LanguageKey, Dictionary> = {
  en: {
    page: {
      title: 'ARAM Random Team Generator',
      description:
        'Generate two colossal ARAM squads using a shared seed so your friends can reroll the exact same clash. Copy or share the current seed, or spin up a fresh one whenever inspiration strikes.',
      teamLabel: 'Team',
      regenerate: 'Regenerate',
      championCountLabel: 'Champions',
      leftBadge: 'Sun Team',
      rightBadge: 'Moon Team',
    },
    seedActions: {
      seedLabel: 'Seed',
      copyLink: 'Copy link',
      share: 'Share',
      copyMatchup: 'Copy matchup',
      clipboardUnavailable: 'Clipboard unavailable in this browser.',
      seedCopied: 'Seed copied to clipboard!',
      seedCopyError: 'Unable to copy seed. Please try again.',
      matchupCopied: 'Matchup copied!',
      matchupCopyError: 'Unable to copy matchup. Please try again.',
      shareSuccess: 'Seed shared!',
      shareFailure: 'Sharing failed. Try copying instead.',
      shareTitle: 'ARAM Randomizer',
      summary: {
        seed: 'ARAM Seed',
        championsPerTeam: 'Champions per team',
        teamLabel: 'Team',
      },
    },
    teamControls: {
      heading: 'Team Options',
      championsPerTeam: 'Champions per team',
      decreaseAria: 'Decrease champions per team',
      increaseAria: 'Increase champions per team',
      rangeAria: 'Champions per team',
      helper:
        'Dial in anything from tight 10 champion crews to sprawling 20 pick drafts while keeping every seed instantly shareable.',
    },
    teamSummary: {
      heading: 'Composition overview',
      uniqueRoles: 'Unique roles',
      roleDistribution: 'Role distribution',
      averageDifficulty: 'Avg. difficulty',
      roleLabels: roleLabels.en,
    },
    languageSelector: {
      label: 'Language',
      options: {
        en: 'English',
        vi: 'Tiếng Việt',
      },
    },
  },
  vi: {
    page: {
      title: 'Trình Tạo Đội ARAM Ngẫu Nhiên',
      description:
        'Tạo hai đội ARAM khổng lồ bằng cùng một hạt giống để cả nhóm cùng nhận kèo đại chiến. Sao chép hoặc chia sẻ hạt giống hiện tại, hoặc tạo mã mới bất cứ lúc nào.',
      teamLabel: 'Đội',
      regenerate: 'Tạo lại',
      championCountLabel: 'Tướng',
      leftBadge: 'Thái Dương',
      rightBadge: 'Nguyệt Ảnh',
    },
    seedActions: {
      seedLabel: 'Hạt giống',
      copyLink: 'Sao chép liên kết',
      share: 'Chia sẻ',
      copyMatchup: 'Sao chép đội hình',
      clipboardUnavailable: 'Trình duyệt này không hỗ trợ bảng tạm.',
      seedCopied: 'Đã sao chép hạt giống!',
      seedCopyError: 'Không thể sao chép hạt giống. Vui lòng thử lại.',
      matchupCopied: 'Đã sao chép đội hình!',
      matchupCopyError: 'Không thể sao chép đội hình. Vui lòng thử lại.',
      shareSuccess: 'Đã chia sẻ hạt giống!',
      shareFailure: 'Chia sẻ thất bại. Hãy thử sao chép.',
      shareTitle: 'Bộ random ARAM',
      summary: {
        seed: 'Hạt giống ARAM',
        championsPerTeam: 'Tướng mỗi đội',
        teamLabel: 'Đội',
      },
    },
    teamControls: {
      heading: 'Tùy chọn đội',
      championsPerTeam: 'Số tướng mỗi đội',
      decreaseAria: 'Giảm số tướng mỗi đội',
      increaseAria: 'Tăng số tướng mỗi đội',
      rangeAria: 'Số tướng mỗi đội',
      helper:
        'Tùy chỉnh từ đội hình 10 tướng gọn nhẹ đến bản nháp 20 tướng hoành tráng mà vẫn chia sẻ hạt giống ngay lập tức.',
    },
    teamSummary: {
      heading: 'Tổng quan đội hình',
      uniqueRoles: 'Số vai trò khác nhau',
      roleDistribution: 'Phân bố vai trò',
      averageDifficulty: 'Độ khó trung bình',
      roleLabels: roleLabels.vi,
    },
    languageSelector: {
      label: 'Ngôn ngữ',
      options: {
        en: 'English',
        vi: 'Tiếng Việt',
      },
    },
  },
};

export const resolveLanguage = (rawLanguage?: string): LanguageKey => {
  if (!rawLanguage) {
    return DEFAULT_LANGUAGE;
  }

  const normalized = rawLanguage.toLowerCase();
  if (normalized === 'vi') {
    return 'vi';
  }

  return DEFAULT_LANGUAGE;
};

export const getDictionary = (language: LanguageKey) => DICTIONARY[language];
