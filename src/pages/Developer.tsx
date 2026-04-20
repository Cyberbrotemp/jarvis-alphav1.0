import Navbar from "@/components/Navbar";
import { DEVELOPER } from "@/data/tools";
import devAvatar from "@/assets/dev-avatar.jpg";
import { Instagram, Github, Youtube, Twitter } from "lucide-react";

const iconFor = (name: string) => {
  if (name.toLowerCase().includes("insta")) return <Instagram className="w-5 h-5" />;
  if (name.toLowerCase().includes("git")) return <Github className="w-5 h-5" />;
  if (name.toLowerCase().includes("you")) return <Youtube className="w-5 h-5" />;
  return <Twitter className="w-5 h-5" />;
};

const Developer = () => (
  <>
    <Navbar />
    <main className="container py-10 max-w-3xl">
      <div className="surface rounded-3xl p-8 text-center glow-border">
        <img src={devAvatar} alt={DEVELOPER.name} className="w-36 h-36 rounded-full mx-auto object-cover border-2 border-primary animate-pulse-glow" loading="lazy" width={144} height={144} />
        <h1 className="text-3xl font-bold mt-5 text-glow">{DEVELOPER.name}</h1>
        <p className="text-primary font-medium">{DEVELOPER.title}</p>
        <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{DEVELOPER.bio}</p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {DEVELOPER.socials.map((s) => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground transition text-sm">
              {iconFor(s.name)} {s.handle}
            </a>
          ))}
        </div>
      </div>
    </main>
  </>
);

export default Developer;
