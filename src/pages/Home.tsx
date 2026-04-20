import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import IntroVideo from "@/components/IntroVideo";
import ToolCard from "@/components/ToolCard";
import { TOOLS } from "@/data/tools";

const Home = () => {
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase().trim();

  const filtered = useMemo(
    () => (q ? TOOLS.filter((t) => (t.name + t.short + t.description).toLowerCase().includes(q)) : TOOLS),
    [q]
  );

  return (
    <>
      <Navbar />
      <main className="container py-8">
        <section className="mb-10">
          <h1 className="sr-only">JARVIS AI Hub Tube – AI tools library</h1>
          <IntroVideo />
        </section>

        <section>
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-2xl font-bold text-glow">{q ? `Results for "${q}"` : "Trending AI Tools"}</h2>
            <span className="text-sm text-muted-foreground">{filtered.length} tools</span>
          </div>
          {filtered.length === 0 ? (
            <p className="text-muted-foreground">No tools match your search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((t) => <ToolCard key={t.id} tool={t} />)}
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
