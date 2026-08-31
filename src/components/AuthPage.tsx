import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Compass, Loader2, Lock, Mail, Sparkles, Target, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

export function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/dashboard" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, career_goal: careerGoal },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        if (!data.session) {
          setInfo("Check your email to confirm your account, then sign in.");
          setMode("login");
        } else {
          navigate({ to: "/dashboard" });
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) setError(result.error.message ?? "Google sign-in failed");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 font-display text-lg font-semibold">
            <Sparkles className="size-5 text-primary" />
            Skill Maps
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight">
            Where do you want to <span className="text-brand-gradient">go next?</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue your learning path."
              : "Create your account and get your personalized path."}
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-border bg-card/80 p-6 shadow-brand-soft backdrop-blur"
        >
          {mode === "signup" && (
            <>
              <label className="mb-4 block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Full name</span>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3">
                  <User className="size-4 text-muted-foreground" />
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
                  />
                </span>
              </label>
              <label className="mb-4 block">
                <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Career goal</span>
                <span className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3">
                  <Target className="size-4 text-muted-foreground" />
                  <input
                    required
                    value={careerGoal}
                    onChange={(e) => setCareerGoal(e.target.value)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
                  />
                </span>
              </label>
            </>
          )}

          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</span>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3">
              <Mail className="size-4 text-muted-foreground" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </span>
          </label>

          <label className="mb-4 block">
            <span className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</span>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3">
              <Lock className="size-4 text-muted-foreground" />
              <input
                required
                type="password"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground/60"
              />
            </span>
          </label>

          {error && <p className="mb-3 text-sm text-destructive">{error}</p>}
          {info && <p className="mb-3 text-sm text-primary">{info}</p>}

          <button
            type="submit"
            disabled={busy}
            className="bg-brand-gradient shadow-brand flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.01] disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <Compass className="size-4" />}
            {mode === "login" ? "Sign in" : "Create my path"}
          </button>

          <div className="my-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={signInWithGoogle}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-6 py-3.5 text-sm font-medium transition-colors hover:bg-secondary/70"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
              <path fill="#EA4335" d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.72 12 .72 7.44.72 3.58 3.34 1.7 7.26l3.66 2.84C6.24 7.22 8.86 5.04 12 5.04z" />
              <path fill="#4285F4" d="M23.5 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.68 2.85c2.15-1.99 3.75-4.93 3.75-8.67z" />
              <path fill="#FBBC05" d="M5.36 14.09a7.06 7.06 0 0 1 0-4.18L1.7 7.07a11.28 11.28 0 0 0 0 10.06l3.66-3.04z" />
              <path fill="#34A853" d="M12 23.28c3.04 0 5.6-1 7.46-2.72l-3.68-2.85c-1.02.69-2.33 1.1-3.78 1.1-3.14 0-5.76-2.18-6.64-5.06l-3.66 2.84c1.88 3.92 5.74 6.69 10.3 6.69z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New to Skill Maps?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError(null);
                setInfo(null);
              }}
              className="font-medium text-primary hover:underline"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
