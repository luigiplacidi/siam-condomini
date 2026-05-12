const fallbackSiteUrl = "http://localhost:3000";

export function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallbackSiteUrl).replace(/\/$/, "");
}
