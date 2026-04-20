import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import IntroVideo from "@/components/IntroVideo";
import { getTool, DEVELOPER } from "@/data/tools";
import { useAuth } from "@/contexts/AuthContext";
import {
  addToHistory, isLiked, toggleLike, isSaved, toggleSaved,
} from "@/lib/storage";
import {
  Home as HomeIcon, ThumbsUp, Bookmark, Share2, Copy, Download,
  ShieldAlert, KeyRound, Lock, MessageCircle, Instagram, Github, Youtube, Twitter,
} from "lucide-react";
import devAvatar from "@/assets/dev-avatar.jpg";

const iconFor = (name: string) => {
  if (name.toLowerCase().includes("insta")) return <Instagram className="w-4 h-4" />;
  if (name.toLowerCase().includes("git")) return <Github className="w-4 h-4" />;
  if (name.toLowerCase().includes("you")) return <Youtube className="w-4 h-4" />;
  return <Twitter className="w-4 h-4" />;
};

const ToolDetail = () => {
  const { id = "" } = useParams();
  const nav = useNavigate();
  const tool = getTool(id);
  const { user } = useAuth();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [warnOpen, setWarnOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [pwOpen, setPwOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (user && tool) addToHistory(user.email, tool.id);
    if (user && tool) {
      setLiked(isLiked(user.email, tool.id));
      setSaved(isSaved(user.email, tool.id));
    }
  }, [user, tool]);

  const shareUrl = useMemo(() => window.location.href, [tool?.id]);

  if (!tool) {
    return (
      <>
        <Navbar />
        <main className="container py-12 text-center">
          <p>Tool not found.</p>
          <Link to="/home" className="text-primary hover:underline">Back home</Link>
        </main>
      </>
    );
  }

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const onLike = () => {
    if (!user) return nav("/login");
    setLiked(toggleLike(user.email, tool.id));
  };
  const onSave = () => {
    if (!user) return nav("/login");
    setSaved(toggleSaved(user.email, tool.id));
  };

  const confirmDownload = () => {
    if (!agreed) return;
    window.open(tool.exeUrl, "_blank", "noopener,noreferrer");
    setWarnOpen(false);
    setAgreed(false);
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === tool.sourcePassword) {
      setPwError("");
      setUnlocking(true);
      setTimeout(() => {
        window.open(tool.sourceUrl, "_blank", "noopener,noreferrer");
        setUnlocking(false);
        setPwOpen(false);
        setPw("");
      }, 5000);
    } else {
      const go = window.confirm(
        "Wrong password.\n\nContact admin on Instagram for help.\n\nClick OK to open Instagram, or Cancel."
      );
      if (go) window.open(DEVELOPER.instagramAdmin, "_blank", "noopener,noreferrer");
      setPwError("Wrong password. Contact admin.");
    }
  };

  const shareWhatsApp = `https://wa.me/?text=${encodeURIComponent(`${tool.name} – ${shareUrl}`)}`;

  return (
    <>
      <Navbar />
      <main className="container py-6 grid lg:grid-cols-3 gap-8">
        {/* Left/main */}
        <div className="lg:col-span-2 space-y-6">
          <VideoPlayer videoUrl={tool.videoUrl} thumbnail={tool.thumbnail} />

          <div>
            <h1 className="text-2xl font-bold">{tool.name}</h1>
            <p className="text-sm text-muted-foreground">{tool.views} views • {tool.duration}</p>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <button onClick={onLike} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${liked ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                <ThumbsUp className="w-4 h-4" /> {liked ? "Liked" : "Like"}
              </button>
              <button onClick={onSave} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${saved ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-secondary"}`}>
                <Bookmark className="w-4 h-4" /> {saved ? "Saved" : "Save"}
              </button>
              <button onClick={() => setShareOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-full border border-border hover:bg-secondary">
                <Share2 className="w-4 h-4" /> Share
              </button>
              <span className="ml-auto text-sm text-muted-foreground tabular-nums">{now.toLocaleTimeString()}</span>
              <Link to="/home" className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition">
                <HomeIcon className="w-4 h-4" /> Home
              </Link>
            </div>
          </div>

          {/* Description */}
          <section className="surface rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="text-sm leading-relaxed text-foreground/90">{tool.description}</p>
            <p className="text-xs text-muted-foreground italic">Terms & Conditions: For educational purposes only. Comments are disabled.</p>

            <div className="grid sm:grid-cols-2 gap-4">
              <Spec title="Required Hardware" items={tool.hardware} onCopy={(text) => copy(text, "hw")} copied={copied === "hw"} />
              <Spec title="Required Packages" items={tool.packages} onCopy={(text) => copy(text, "pkg")} copied={copied === "pkg"} />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button onClick={() => setWarnOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
                <Download className="w-4 h-4" /> Download .exe
              </button>
              <button onClick={() => setPwOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary">
                <Lock className="w-4 h-4" /> Source code
              </button>
              <a href="https://instagram.com/jarvisv1.0" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary">
                <Instagram className="w-4 h-4" /> Instagram Reel
              </a>
            </div>
          </section>

          {/* Looping intro */}
          <section>
            <h2 className="font-semibold text-lg mb-3">Channel intro</h2>
            <IntroVideo />
          </section>
        </div>

        {/* Sidebar: developer */}
        <aside className="space-y-6">
          <div className="surface rounded-2xl p-5 text-center">
            <img src={devAvatar} alt={DEVELOPER.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-primary" loading="lazy" width={96} height={96} />
            <h3 className="font-semibold text-lg mt-3">About the developer</h3>
            <p className="text-primary text-sm">{DEVELOPER.name}</p>
            <p className="text-xs text-muted-foreground mt-1">{DEVELOPER.title}</p>
            <p className="text-xs text-muted-foreground mt-2 italic">Prompt by Tony Stark</p>
            <div className="flex justify-center flex-wrap gap-2 mt-4">
              {DEVELOPER.socials.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground text-xs transition">
                  {iconFor(s.name)} {s.name}
                </a>
              ))}
            </div>
            <Link to="/developer" className="inline-block mt-4 text-xs text-primary hover:underline">View developer page →</Link>
          </div>
        </aside>
      </main>

      {/* Share modal */}
      {shareOpen && (
        <Modal onClose={() => setShareOpen(false)} title="Share">
          <div className="space-y-3">
            <a href={shareWhatsApp} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary">
              <MessageCircle className="w-5 h-5 text-green-500" /> Share on WhatsApp
            </a>
            <button onClick={() => copy(shareUrl, "url")}
              className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary">
              <Copy className="w-5 h-5" /> {copied === "url" ? "Copied!" : "Copy link"}
            </button>
            <p className="text-xs text-muted-foreground break-all bg-input p-2 rounded">{shareUrl}</p>
          </div>
        </Modal>
      )}

      {/* EXE download warning */}
      {warnOpen && (
        <Modal onClose={() => setWarnOpen(false)} title="Download warning">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-destructive/40 bg-destructive/10">
              <ShieldAlert className="w-6 h-6 text-destructive shrink-0" />
              <p className="text-sm">
                ⚠ This .exe is shared for educational purposes only. Some antivirus tools may flag AI binaries.
                Download at your own risk. Do not redistribute or use for malicious purposes.
              </p>
            </div>
            <label className="flex items-start gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
              I have read and agree to the terms & conditions.
            </label>
            <div className="flex justify-end gap-2">
              <button onClick={() => setWarnOpen(false)} className="px-4 py-2 rounded-lg border border-border hover:bg-secondary">Cancel</button>
              <button onClick={confirmDownload} disabled={!agreed}
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90">
                Download
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Source code password */}
      {pwOpen && (
        <Modal onClose={() => !unlocking && setPwOpen(false)} title="Source code access">
          <form onSubmit={submitPassword} className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter the password to unlock the source code repository.</p>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                disabled={unlocking}
                placeholder="Password"
                className="w-full h-11 pl-9 pr-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            {pwError && <p className="text-sm text-destructive">{pwError}</p>}
            {unlocking && <p className="text-sm text-primary animate-pulse">Verifying… opening repository in 5 seconds.</p>}
            <div className="flex justify-end gap-2">
              <button type="button" disabled={unlocking} onClick={() => setPwOpen(false)} className="px-4 py-2 rounded-lg border border-border hover:bg-secondary disabled:opacity-50">Cancel</button>
              <button type="submit" disabled={unlocking || !pw} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50">
                Unlock
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

const Spec = ({ title, items, onCopy, copied }: { title: string; items: string[]; onCopy: (t: string) => void; copied: boolean }) => (
  <div className="rounded-xl border border-border p-3">
    <div className="flex items-center justify-between mb-2">
      <p className="font-medium text-sm">{title}</p>
      <button onClick={() => onCopy(items.join("\n"))} className="p-1 rounded hover:bg-secondary" title="Copy">
        <Copy className="w-3.5 h-3.5" />
      </button>
    </div>
    <ul className="text-sm space-y-1 text-foreground/90">
      {items.map((it) => <li key={it} className="font-mono text-xs">• {it}</li>)}
    </ul>
    {copied && <p className="text-xs text-primary mt-2">Copied!</p>}
  </div>
);

const VideoPlayer = ({ videoUrl, thumbnail }: { videoUrl: string; thumbnail: string }) => {
  const [failed, setFailed] = useState(false);
  if (!videoUrl || failed) {
    return (
      <div className="aspect-video rounded-2xl overflow-hidden surface">
        <img src={thumbnail} alt="thumbnail" className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="aspect-video rounded-2xl overflow-hidden surface glow-border bg-black">
      <video src={videoUrl} controls poster={thumbnail} className="w-full h-full" onError={() => setFailed(true)} />
    </div>
  );
};

const Modal = ({ children, title, onClose }: { children: React.ReactNode; title: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/70 backdrop-blur-sm" onClick={onClose}>
    <div className="surface rounded-2xl p-6 max-w-md w-full glow-border" onClick={(e) => e.stopPropagation()}>
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      {children}
    </div>
  </div>
);

export default ToolDetail;
