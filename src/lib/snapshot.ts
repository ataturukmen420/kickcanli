// ⚠️ Otomatik üretildi — 2026-06-02 Kick API taraması.
// İlk-paint, SEO (JSON-LD) ve client fetch başarısız olursa fallback için.
// Yenile: powershell scripts/fetch-kick-api.ps1 && node scripts/refresh-snapshot-from-cache.mjs
import type { KickData } from "./kick";

export const INITIAL_KICK_DATA: KickData = {
  "followers": 2826,
  "profilePic": "https://files.kick.com/images/user/27642225/profile_image/conversion/91b2fafc-8ba8-4789-ac71-7559ef8a5b23-fullsize.webp",
  "bio": "Tayland’da lokal bir yaşam, her gün yeni bir macera! 🌾\n\nIRL yayınlarda birlikte geziyor, dumanlı sohbetlerde tecrübelerimi paylaşıyorum. Kendi ürünlerim ve kaçırılmayacak hikayelerle neredeyse her gün yayındayım.\n\nTakip et, bu macerayı birlikte yaşayalım! ✨🤟",
  "live": {
    "isLive": false,
    "title": null,
    "viewers": 0,
    "category": null,
    "startedAt": null
  },
  "vods": [
    {
      "id": 111275747,
      "title": "🥦Dukkaninda Yayin| Pattaya",
      "url": "https://kick.com/ataturukmen/videos/f9501b23-12d7-485a-a337-e4a34d235d91",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/PuJwUVyZTCST/720.webp",
      "durationMs": 3032000,
      "views": 162,
      "createdAt": "2026-06-02 19:21:02",
      "category": "Just Chatting",
      "videoUuid": "f9501b23-12d7-485a-a337-e4a34d235d91"
    },
    {
      "id": 111251057,
      "title": "🥦Dukkaninda Yayin| Pattaya",
      "url": "https://kick.com/ataturukmen/videos/2060b021-a22d-404c-a673-5f5f06c23964",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/TvBaUqJ5Aahx/720.webp",
      "durationMs": 10896000,
      "views": 156,
      "createdAt": "2026-06-02 16:17:32",
      "category": "Just Chatting",
      "videoUuid": "2060b021-a22d-404c-a673-5f5f06c23964"
    },
    {
      "id": 111243090,
      "title": "Tayland`dan IRL Yayin | Pattaya",
      "url": "https://kick.com/ataturukmen/videos/1d1b5a6b-79be-49b9-bb81-7335dacd731d",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/S76X3cXwujnk/720.webp",
      "durationMs": 4750000,
      "views": 129,
      "createdAt": "2026-06-02 14:58:00",
      "category": "IRL",
      "videoUuid": "1d1b5a6b-79be-49b9-bb81-7335dacd731d"
    },
    {
      "id": 111139267,
      "title": "Dumanlı Muhabbet 🌿💧| Tayland",
      "url": "https://kick.com/ataturukmen/videos/b38c6efb-4289-4815-b74d-8f840b26f421",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/hoJ6wR0ig7Ch/720.webp",
      "durationMs": 16015000,
      "views": 449,
      "createdAt": "2026-06-01 19:34:22",
      "category": "Just Chatting",
      "videoUuid": "b38c6efb-4289-4815-b74d-8f840b26f421"
    },
    {
      "id": 111030266,
      "title": "Dumanlı Muhabbet 🌿💧",
      "url": "https://kick.com/ataturukmen/videos/6ccca813-52b6-4357-844a-077c29a10a7f",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/fl3EvwmZ5eIf/720.webp",
      "durationMs": 1642000,
      "views": 315,
      "createdAt": "2026-05-31 22:40:30",
      "category": "Just Chatting",
      "videoUuid": "6ccca813-52b6-4357-844a-077c29a10a7f"
    },
    {
      "id": 111021942,
      "title": "Dumanlı Muhabbet 🌿💧",
      "url": "https://kick.com/ataturukmen/videos/df6c452e-fee8-411c-af9e-e6f63a5cd91d",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/V62z01fw0npa/720.webp",
      "durationMs": 3724000,
      "views": 428,
      "createdAt": "2026-05-31 21:37:42",
      "category": "Just Chatting",
      "videoUuid": "df6c452e-fee8-411c-af9e-e6f63a5cd91d"
    },
    {
      "id": 110998329,
      "title": "Dumanlı Muhabbet 🌿💧",
      "url": "https://kick.com/ataturukmen/videos/502d218b-2e14-4445-b9d4-230b3547f4c8",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/YozCTG9pu4Um/720.webp",
      "durationMs": 10394000,
      "views": 554,
      "createdAt": "2026-05-31 18:44:16",
      "category": "Just Chatting",
      "videoUuid": "502d218b-2e14-4445-b9d4-230b3547f4c8"
    },
    {
      "id": 110856726,
      "title": "Dumanlı Muhabbet 🌿💧",
      "url": "https://kick.com/ataturukmen/videos/6262d984-db2c-49d4-a82f-b420e904a0e2",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/QGu456SK4ljK/720.webp",
      "durationMs": 7704000,
      "views": 457,
      "createdAt": "2026-05-30 19:06:04",
      "category": "IRL",
      "videoUuid": "6262d984-db2c-49d4-a82f-b420e904a0e2"
    },
    {
      "id": 110541506,
      "title": "Dumanlı Muhabbet 🌿💧",
      "url": "https://kick.com/ataturukmen/videos/f831cc7d-ce28-4c23-80b3-df27d066bad1",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/37Z4OfKRKsuK/720.webp",
      "durationMs": 5962000,
      "views": 523,
      "createdAt": "2026-05-28 12:26:52",
      "category": "IRL",
      "videoUuid": "f831cc7d-ce28-4c23-80b3-df27d066bad1"
    },
    {
      "id": 109757720,
      "title": "BOB MARLEYIN OĞLUNUN KONSERI",
      "url": "https://kick.com/ataturukmen/videos/3916965f-8d7c-47dc-acd4-566e9147edb0",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/WsQTSaY7QrKf/720.webp",
      "durationMs": 5456000,
      "views": 613,
      "createdAt": "2026-05-22 15:52:32",
      "category": "IRL",
      "videoUuid": "3916965f-8d7c-47dc-acd4-566e9147edb0"
    },
    {
      "id": 109747832,
      "title": "Bob Marleyin Oğluyla takılıyoz",
      "url": "https://kick.com/ataturukmen/videos/09175b27-f229-44da-bd48-d9b459073969",
      "thumbnail": "https://images.kick.com/video_thumbnails/1HZHpN36Tm9X/LeCpj83X4gyx/720.webp",
      "durationMs": 4476000,
      "views": 421,
      "createdAt": "2026-05-22 13:59:26",
      "category": "Just Chatting",
      "videoUuid": "09175b27-f229-44da-bd48-d9b459073969"
    }
  ],
  "clips": [
    {
      "id": "clip_01K8KNMG28K893QP3VN9KHXYXN",
      "title": "ata flüt çalıyor",
      "url": "https://kick.com/ataturukmen/clips/clip_01K8KNMG28K893QP3VN9KHXYXN",
      "thumbnail": "https://clips.kick.com/clips/68/clip_01K8KNMG28K893QP3VN9KHXYXN/thumbnail.webp",
      "durationSec": 19,
      "views": 1244,
      "createdAt": "2025-10-27T20:27:28.289527Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/68/clip_01K8KNMG28K893QP3VN9KHXYXN/playlist.m3u8"
    },
    {
      "id": "clip_01K9FS0SP6X8SSNHD1DPCRT62X",
      "title": "afied",
      "url": "https://kick.com/ataturukmen/clips/clip_01K9FS0SP6X8SSNHD1DPCRT62X",
      "thumbnail": "https://clips.kick.com/clips/23/clip_01K9FS0SP6X8SSNHD1DPCRT62X/thumbnail.webp",
      "durationSec": 39,
      "views": 586,
      "createdAt": "2025-11-07T18:26:07.574091Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/23/clip_01K9FS0SP6X8SSNHD1DPCRT62X/playlist.m3u8"
    },
    {
      "id": "clip_01KAK73PHEW9N85301C95NR23B",
      "title": "bayildi cavo",
      "url": "https://kick.com/ataturukmen/clips/clip_01KAK73PHEW9N85301C95NR23B",
      "thumbnail": "https://clips.kick.com/clips/a3/clip_01KAK73PHEW9N85301C95NR23B/thumbnail.webp",
      "durationSec": 30,
      "views": 488,
      "createdAt": "2025-11-21T12:44:37.212342Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/a3/clip_01KAK73PHEW9N85301C95NR23B/playlist.m3u8"
    },
    {
      "id": "clip_01K9N4N9000B2Z3BMSF676J1X1",
      "title": "baktim abi",
      "url": "https://kick.com/ataturukmen/clips/clip_01K9N4N9000B2Z3BMSF676J1X1",
      "thumbnail": "https://clips.kick.com/clips/d8/clip_01K9N4N9000B2Z3BMSF676J1X1/thumbnail.webp",
      "durationSec": 15,
      "views": 187,
      "createdAt": "2025-11-09T20:25:42.151726Z",
      "category": "Call of Duty: Warzone",
      "videoUrl": "https://clips.kick.com/clips/d8/clip_01K9N4N9000B2Z3BMSF676J1X1/playlist.m3u8"
    },
    {
      "id": "clip_01KAY8P6XES683XKVZYSA0GA8D",
      "title": "hazırlanış",
      "url": "https://kick.com/ataturukmen/clips/clip_01KAY8P6XES683XKVZYSA0GA8D",
      "thumbnail": "https://clips.kick.com/clips/ba/clip_01KAY8P6XES683XKVZYSA0GA8D/thumbnail.webp",
      "durationSec": 60,
      "views": 159,
      "createdAt": "2025-11-25T19:44:07.018271Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/ba/clip_01KAY8P6XES683XKVZYSA0GA8D/playlist.m3u8"
    },
    {
      "id": "clip_01KB3HPFRF3NMT20BGGBXFCQBJ",
      "title": "selamssss",
      "url": "https://kick.com/ataturukmen/clips/clip_01KB3HPFRF3NMT20BGGBXFCQBJ",
      "thumbnail": "https://clips.kick.com/clips/15/clip_01KB3HPFRF3NMT20BGGBXFCQBJ/thumbnail.webp",
      "durationSec": 15,
      "views": 112,
      "createdAt": "2025-11-27T20:58:16.477738Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/15/clip_01KB3HPFRF3NMT20BGGBXFCQBJ/playlist.m3u8"
    },
    {
      "id": "clip_01KD67XW7WHJF69BB3HQJ0VHGP",
      "title": "ne o",
      "url": "https://kick.com/ataturukmen/clips/clip_01KD67XW7WHJF69BB3HQJ0VHGP",
      "thumbnail": "https://clips.kick.com/clips/0c/clip_01KD67XW7WHJF69BB3HQJ0VHGP/thumbnail.webp",
      "durationSec": 22,
      "views": 78,
      "createdAt": "2025-12-23T18:37:19.914201Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/0c/clip_01KD67XW7WHJF69BB3HQJ0VHGP/playlist.m3u8"
    },
    {
      "id": "clip_01KAY8KE749QZ62C06J6MXQX76",
      "title": "maske bong",
      "url": "https://kick.com/ataturukmen/clips/clip_01KAY8KE749QZ62C06J6MXQX76",
      "thumbnail": "https://clips.kick.com/clips/cb/clip_01KAY8KE749QZ62C06J6MXQX76/thumbnail.webp",
      "durationSec": 32,
      "views": 67,
      "createdAt": "2025-11-25T19:42:50.342064Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/cb/clip_01KAY8KE749QZ62C06J6MXQX76/playlist.m3u8"
    },
    {
      "id": "clip_01KSE1G1BEWZ5QWP0Z9N8FG882",
      "title": "hahahahhfsvdagfasdhgasdgh",
      "url": "https://kick.com/ataturukmen/clips/clip_01KSE1G1BEWZ5QWP0Z9N8FG882",
      "thumbnail": "https://clips.kick.com/clips/51/clip_01KSE1G1BEWZ5QWP0Z9N8FG882/thumbnail.webp",
      "durationSec": 10,
      "views": 62,
      "createdAt": "2026-05-24T22:26:04.086842Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/51/clip_01KSE1G1BEWZ5QWP0Z9N8FG882/playlist.m3u8"
    },
    {
      "id": "clip_01KAY8FHTCRJ4YP2WMK4PC24YM",
      "title": "çarkıfelek",
      "url": "https://kick.com/ataturukmen/clips/clip_01KAY8FHTCRJ4YP2WMK4PC24YM",
      "thumbnail": "https://clips.kick.com/clips/f8/clip_01KAY8FHTCRJ4YP2WMK4PC24YM/thumbnail.webp",
      "durationSec": 15,
      "views": 53,
      "createdAt": "2025-11-25T19:40:56.98765Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/f8/clip_01KAY8FHTCRJ4YP2WMK4PC24YM/playlist.m3u8"
    },
    {
      "id": "clip_01KC1WQSSJYP2YX487T0V1WZW0",
      "title": "aaaa",
      "url": "https://kick.com/ataturukmen/clips/clip_01KC1WQSSJYP2YX487T0V1WZW0",
      "thumbnail": "https://clips.kick.com/clips/4e/clip_01KC1WQSSJYP2YX487T0V1WZW0/thumbnail.webp",
      "durationSec": 60,
      "views": 38,
      "createdAt": "2025-12-09T15:47:43.419044Z",
      "category": "IRL",
      "videoUrl": "https://clips.kick.com/clips/4e/clip_01KC1WQSSJYP2YX487T0V1WZW0/playlist.m3u8"
    },
    {
      "id": "clip_01KQ2X9AGQR8R9Y7TPZHHBYDN6",
      "title": "ata",
      "url": "https://kick.com/ataturukmen/clips/clip_01KQ2X9AGQR8R9Y7TPZHHBYDN6",
      "thumbnail": "https://clips.kick.com/clips/22/clip_01KQ2X9AGQR8R9Y7TPZHHBYDN6/thumbnail.webp",
      "durationSec": 60,
      "views": 26,
      "createdAt": "2026-04-25T18:09:50.583247Z",
      "category": "Just Chatting",
      "videoUrl": "https://clips.kick.com/clips/22/clip_01KQ2X9AGQR8R9Y7TPZHHBYDN6/playlist.m3u8"
    }
  ]
};
