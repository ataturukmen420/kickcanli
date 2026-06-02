"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { fetchChannel, fetchClips, type KickData } from "@/lib/kick";
import { INITIAL_KICK_DATA } from "@/lib/snapshot";

const POLL_MS = 60_000;

interface KickContextValue {
  data: KickData;
  live: boolean;
  /** En az bir kez canlı veri başarıyla çekildi mi. */
  fresh: boolean;
  refreshing: boolean;
  error: boolean;
  lastUpdated: number | null;
  refresh: () => void;
}

const KickContext = createContext<KickContextValue | null>(null);

export function KickDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<KickData>(INITIAL_KICK_DATA);
  const [fresh, setFresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setRefreshing(true);
    const [ch, clips] = await Promise.allSettled([fetchChannel(), fetchClips()]);

    setData((prev) => {
      const next: KickData = { ...prev };
      if (ch.status === "fulfilled") {
        next.followers = ch.value.followers;
        next.profilePic = ch.value.profilePic ?? prev.profilePic;
        next.bio = ch.value.bio ?? prev.bio;
        next.live = ch.value.live;
        next.vods = ch.value.vods.length ? ch.value.vods : prev.vods;
      }
      if (clips.status === "fulfilled") {
        next.clips = clips.value.length ? clips.value : prev.clips;
      }
      return next;
    });

    const ok = ch.status === "fulfilled" || clips.status === "fulfilled";
    setError(!ok);
    if (ok) {
      setFresh(true);
      setLastUpdated(Date.now());
    }
    setRefreshing(false);
    inFlight.current = false;
  }, []);

  useEffect(() => {
    refresh();
    const id = setInterval(refresh, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  return (
    <KickContext.Provider
      value={{ data, live: data.live.isLive, fresh, refreshing, error, lastUpdated, refresh }}
    >
      {children}
    </KickContext.Provider>
  );
}

export function useKickData(): KickContextValue {
  const ctx = useContext(KickContext);
  if (!ctx) throw new Error("useKickData KickDataProvider içinde kullanılmalı");
  return ctx;
}
