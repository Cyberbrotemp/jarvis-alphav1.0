import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const Splash = () => {
  const nav = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 10000) * 100);
      setProgress(p);
      if (p >= 100) {
        clearInterval(tick);
        nav("/home", { replace: true });
      }
    }, 50);
    return () => clearInterval(tick);
  }, [nav]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="JARVIS AI Hub Tube" className="w-40 h-40 animate-pulse-glow rounded-full mb-8" width={160} height={160} />
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-glow">
        JARVIS <span className="text-primary">AI Hub Tube</span>
      </h1>
      <p className="mt-3 text-muted-foreground max-w-md">Initializing systems… loading your AI tools library.</p>
      <div className="mt-10 w-72 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{Math.floor(progress)}%</p>
    </main>
  );
};

export default Splash;
