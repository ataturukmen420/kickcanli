import { INITIAL_KICK_DATA } from "./snapshot";
import { kickDateToIso } from "./format";

export const SITE_URL = "https://kickcanli.com";

// Snapshot'taki en yeni içerik tarihi — ProfilePage.dateModified ve sitemap
// lastModified için gerçekçi (uydurma olmayan) güncellik sinyali.
export const LAST_CONTENT_UPDATE = [
  ...INITIAL_KICK_DATA.vods.map((v) => v.createdAt),
  ...INITIAL_KICK_DATA.clips.map((c) => c.createdAt),
]
  .map(kickDateToIso)
  .sort()
  .at(-1);
