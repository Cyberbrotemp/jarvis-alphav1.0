import Navbar from "@/components/Navbar";
import ToolCard from "@/components/ToolCard";
import { useAuth } from "@/contexts/AuthContext";
import { getHistory } from "@/lib/storage";
import { TOOLS } from "@/data/tools";

const History = () => {
  const { user } = useAuth();
  const ids = user ? getHistory(user.email) : [];
  const tools = ids.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean) as typeof TOOLS;

  return (
    <>
      <Navbar />
      <main className="container py-8">
        <h1 className="text-2xl font-bold mb-6 text-glow">Watch history</h1>
        {tools.length === 0 ? (
          <p className="text-muted-foreground">You haven’t watched any tools yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tools.map((t) => <ToolCard key={t.id} tool={t} />)}
          </div>
        )}
      </main>
    </>
  );
};

export default History;
