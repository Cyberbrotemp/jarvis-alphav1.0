import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import {
  User, getCurrentUser, setSession, clearSession,
  findUser, upsertUser,
} from "@/lib/storage";

type AuthCtx = {
  user: User | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  forgotPassword: (email: string) => { ok: boolean; password?: string; error?: string };
  updateProfile: (patch: Partial<Omit<User, "email" | "createdAt">>) => void;
  changePassword: (current: string, next: string) => { ok: boolean; error?: string };
  refresh: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => getCurrentUser());

  const refresh = useCallback(() => setUser(getCurrentUser()), []);

  useEffect(() => {
    const onStorage = () => refresh();
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [refresh]);

  const register: AuthCtx["register"] = (name, email, password) => {
    const e = email.trim().toLowerCase();
    if (!name.trim() || !e || !password) return { ok: false, error: "All fields are required." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return { ok: false, error: "Invalid email address." };
    if (password.length < 4) return { ok: false, error: "Password must be 4+ characters." };
    if (findUser(e)) return { ok: false, error: "Email already registered." };
    upsertUser({ email: e, name: name.trim(), password, createdAt: Date.now() });
    setSession(e);
    refresh();
    return { ok: true };
  };

  const login: AuthCtx["login"] = (email, password) => {
    const u = findUser(email);
    if (!u) return { ok: false, error: "Account not found." };
    if (u.password !== password) return { ok: false, error: "Wrong password." };
    setSession(u.email);
    refresh();
    return { ok: true };
  };

  const logout = () => { clearSession(); refresh(); };

  const forgotPassword: AuthCtx["forgotPassword"] = (email) => {
    const u = findUser(email);
    if (!u) return { ok: false, error: "No account found for this email." };
    return { ok: true, password: u.password };
  };

  const updateProfile: AuthCtx["updateProfile"] = (patch) => {
    if (!user) return;
    const updated = { ...user, ...patch };
    upsertUser(updated);
    setUser(updated);
  };

  const changePassword: AuthCtx["changePassword"] = (current, next) => {
    if (!user) return { ok: false, error: "Not signed in." };
    if (user.password !== current) return { ok: false, error: "Current password is wrong." };
    if (next.length < 4) return { ok: false, error: "New password must be 4+ characters." };
    upsertUser({ ...user, password: next });
    refresh();
    return { ok: true };
  };

  return (
    <Ctx.Provider value={{ user, register, login, logout, forgotPassword, updateProfile, changePassword, refresh }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
