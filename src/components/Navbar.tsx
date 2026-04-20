import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home, History, Heart, User as UserIcon, Palette, LogOut, Code2, Search } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import defaultAvatar from "@/assets/default-avatar.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 surface border-b border-border/60">
      <div className="container flex items-center gap-3 h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="Jarvis AI Hub Tube logo" className="w-9 h-9 animate-pulse-glow rounded-full" width={36} height={36} />
          <span className="font-bold text-lg tracking-tight hidden sm:inline text-glow">JARVIS<span className="text-primary"> Tube</span></span>
        </Link>

        <form onSubmit={submit} className="flex-1 max-w-xl mx-auto hidden md:flex">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-9 pr-4 h-10 rounded-full bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </form>

        <nav className="flex items-center gap-1">
          <NavBtn to="/" icon={<Home className="w-4 h-4" />} label="Home" />
          <NavBtn to="/history" icon={<History className="w-4 h-4" />} label="History" />
          <NavBtn to="/liked" icon={<Heart className="w-4 h-4" />} label="Liked" />
          <NavBtn to="/themes" icon={<Palette className="w-4 h-4" />} label="Themes" />
          <NavBtn to="/developer" icon={<Code2 className="w-4 h-4" />} label="Dev" />
          {user ? (
            <>
              <Link to="/profile" className="ml-1 flex items-center gap-2 px-2 py-1 rounded-full hover:bg-secondary">
                <img src={user.avatar || defaultAvatar} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-border" />
                <span className="hidden lg:inline text-sm">{user.name}</span>
              </Link>
              <button onClick={() => { logout(); nav("/login"); }} className="p-2 rounded-full hover:bg-secondary" title="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              <UserIcon className="w-4 h-4 inline mr-1" /> Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

const NavBtn = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center gap-1.5 px-3 py-2 rounded-full text-sm transition ${
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground/90"
      }`
    }
  >
    {icon}
    <span className="hidden lg:inline">{label}</span>
  </NavLink>
);

export default Navbar;
