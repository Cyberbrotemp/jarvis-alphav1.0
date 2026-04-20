import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Field } from "./Login";
import logo from "@/assets/logo.png";

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ ok: boolean; password?: string; error?: string } | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setResult(forgotPassword(email));
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md surface rounded-2xl p-8 glow-border">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="logo" className="w-14 h-14 mb-2" width={56} height={56} />
          <h1 className="text-2xl font-bold text-glow">Forgot password</h1>
          <p className="text-sm text-muted-foreground text-center">Enter your email — we’ll show your saved password (local-only).</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email" value={email} onChange={setEmail} type="email" placeholder="you@example.com" />
          <button className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition">Recover password</button>
        </form>
        {result?.ok && (
          <div className="mt-4 p-3 rounded-lg border border-primary/40 bg-primary/10">
            <p className="text-sm">Your password is:</p>
            <p className="font-mono text-lg text-primary mt-1">{result.password}</p>
          </div>
        )}
        {result && !result.ok && <p className="text-sm text-destructive mt-3">{result.error}</p>}
        <p className="text-sm text-center mt-4">
          Remembered? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;
