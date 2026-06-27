export type SocialMediaLink = {
  platformName: string;
  url: string;
};

export type ContactUsData = {
  email: string;
  phoneNumber: string;
  socialMediaLinks: SocialMediaLink[];
};

export const EMPTY_CONTACT_US: ContactUsData = {
  email: "",
  phoneNumber: "",
  socialMediaLinks: [],
};

export function normalizeContactUs(data: unknown): ContactUsData {
  if (!data || typeof data !== "object") return EMPTY_CONTACT_US;

  const record = data as Record<string, unknown>;
  const links = Array.isArray(record.socialMediaLinks)
    ? record.socialMediaLinks
        .filter((item) => item && typeof item === "object")
        .map((item) => {
          const link = item as Record<string, unknown>;
          return {
            platformName: String(link.platformName ?? ""),
            url: String(link.url ?? ""),
          };
        })
        .filter((item) => item.platformName)
    : [];

  return {
    email: String(record.email ?? ""),
    phoneNumber: String(record.phoneNumber ?? ""),
    socialMediaLinks: links,
  };
}
