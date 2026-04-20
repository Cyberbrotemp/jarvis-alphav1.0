import Navbar from "@/components/Navbar";
import { THEMES, useTheme } from "@/contexts/ThemeContext";
import { Check } from "lucide-react";

const Themes = () => {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <Navbar />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-2 text-glow">Themes</h1>
        <p className="text-muted-foreground mb-6">Pick a theme — each one comes with its own background image.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`relative aspect-video rounded-2xl overflow-hidden border-2 transition ${
                theme === t.id ? "border-primary glow-border" : "border-border hover:border-primary/60"
              }`}
            >
              <img src={t.bg} alt={t.label} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="font-semibold text-lg">{t.label}</span>
                {theme === t.id && (
                  <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary text-primary-foreground">
                    <Check className="w-3 h-3" /> Active
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

export default Themes;
