export type PrivacyPolicyData = {
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
};

export const EMPTY_PRIVACY_POLICY: PrivacyPolicyData = {
  titleAr: "",
  titleEn: "",
  contentAr: "",
  contentEn: "",
};

export function normalizePrivacyPolicy(data: unknown): PrivacyPolicyData {
  if (!data || typeof data !== "object") return EMPTY_PRIVACY_POLICY;

  const record = data as Record<string, unknown>;

  return {
    titleAr: String(record.titleAr ?? ""),
    titleEn: String(record.titleEn ?? ""),
    contentAr: String(record.contentAr ?? ""),
    contentEn: String(record.contentEn ?? ""),
  };
}
