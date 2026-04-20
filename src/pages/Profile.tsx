import { ChangeEvent, FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Camera } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.png";

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [msg, setMsg] = useState("");

  const [cur, setCur] = useState("");
  const [nxt, setNxt] = useState("");
  const [showCur, setShowCur] = useState(false);
  const [showNxt, setShowNxt] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ ok: boolean; text: string } | null>(null);

  if (!user) return null;

  const onAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile({ avatar: reader.result as string });
    reader.readAsDataURL(f);
  };

  const saveInfo = (e: FormEvent) => {
    e.preventDefault();
    updateProfile({ name: name.trim() });
    setMsg("Saved.");
    setTimeout(() => setMsg(""), 1800);
  };

  const submitPw = (e: FormEvent) => {
    e.preventDefault();
    const r = changePassword(cur, nxt);
    setPwMsg({ ok: r.ok, text: r.ok ? "Password updated." : r.error || "Failed" });
    if (r.ok) { setCur(""); setNxt(""); }
  };

  return (
    <>
      <Navbar />
      <main className="container py-8 max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-glow">Your profile</h1>

        <section className="surface rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img src={user.avatar || defaultAvatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-2 border-primary" />
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:opacity-90">
                <Camera className="w-4 h-4" />
                <input type="file" accept="image/*" onChange={onAvatar} className="hidden" />
              </label>
            </div>
            <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <form onSubmit={saveInfo} className="grid sm:grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-sm font-medium">Display name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-11 px-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} disabled className="mt-1 w-full h-11 px-3 rounded-lg bg-input border border-border opacity-60" />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <button className="h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">Save changes</button>
              {msg && <span className="text-sm text-primary">{msg}</span>}
            </div>
          </form>
        </section>

        <section className="surface rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Change password</h2>
          <form onSubmit={submitPw} className="grid sm:grid-cols-2 gap-4">
            <PwField label="Current" value={cur} onChange={setCur} show={showCur} setShow={setShowCur} />
            <PwField label="New password" value={nxt} onChange={setNxt} show={showNxt} setShow={setShowNxt} />
            <div className="sm:col-span-2 flex items-center gap-3">
              <button className="h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">Update password</button>
              {pwMsg && <span className={`text-sm ${pwMsg.ok ? "text-primary" : "text-destructive"}`}>{pwMsg.text}</span>}
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

const PwField = ({ label, value, onChange, show, setShow }: { label: string; value: string; onChange: (v: string) => void; show: boolean; setShow: (v: boolean) => void }) => (
  <div>
    <label className="text-sm font-medium">{label}</label>
    <div className="relative mt-1">
      <input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 pr-10 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring" />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

export default Profile;
