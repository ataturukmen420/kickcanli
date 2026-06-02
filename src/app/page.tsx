import { Hero } from "@/components/hero";
import { LivePlayer } from "@/components/live-player";
import { StreamEndedBanner } from "@/components/stream-ended-banner";
import { VodSection, ClipSection } from "@/components/content-sections";
import { AboutFaq } from "@/components/about-faq";
import { VideoSchema } from "@/components/video-schema";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col gap-10 pb-16">
      <VideoSchema />
      <Hero />
      <LivePlayer />
      <StreamEndedBanner />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="h-px bg-(--border)" />
      </div>

      <VodSection />
      <ClipSection />
      <AboutFaq />
    </main>
  );
}
