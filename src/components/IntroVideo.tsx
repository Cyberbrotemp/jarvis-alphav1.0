import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { INTRO_VIDEO_URL, INTRO_FALLBACK_IMAGE } from "@/data/tools";

type Props = {
  videoUrl?: string;
  fallbackImage?: string;
  className?: string;
};

const IntroVideo = ({ videoUrl = INTRO_VIDEO_URL, fallbackImage = INTRO_FALLBACK_IMAGE, className = "" }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {});
  }, [muted]);

  if (!videoUrl || failed) {
    return (
      <div className={`relative mx-auto w-full max-w-4xl aspect-video rounded-2xl overflow-hidden surface glow-border ${className}`}>
        <img src={fallbackImage} alt="Intro" className="w-full h-full object-cover" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`relative mx-auto w-full max-w-4xl aspect-video rounded-2xl overflow-hidden surface glow-border ${className}`}>
      <video
        ref={ref}
        src={videoUrl}
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted={muted}
        playsInline
        onError={() => setFailed(true)}
      />
      <button
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-3 right-3 p-2.5 rounded-full bg-background/70 backdrop-blur-md border border-border hover:bg-primary hover:text-primary-foreground transition"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default IntroVideo;
