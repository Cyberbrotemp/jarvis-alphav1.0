import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Field } from "./Login";
import logo from "@/assets/logo.png";

const Register = () => {
  const { register } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    const r = register(name, email, password);
    if (!r.ok) return setErr(r.error || "Registration failed");
    nav("/home", { replace: true });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md surface rounded-2xl p-8 glow-border">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-14 h-14 mb-2" width={56} height={56} />
          <h1 className="text-2xl font-bold text-glow">Create account</h1>
          <p className="text-sm text-muted-foreground">Join the JARVIS AI Hub Tube community</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
          <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 pr-10 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••••"
              />
              <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {err && <p className="text-sm text-destructive">{err}</p>}
          <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">Create account</button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
