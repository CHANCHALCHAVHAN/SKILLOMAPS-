import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Compass, HelpCircle, LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ConnectProfiles } from "@/components/ConnectProfiles";
import { Dashboard } from "@/components/Dashboard";
import { MentorPanel } from "@/components/MentorPanel";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Skill Maps — Your Dashboard" },
      {
        name: "description",
        content: "Your career goal, progress, next step and weekly milestones — guided by your AI mentor.",
      },
      { property: "og:title", content: "Skill Maps — Your Dashboard" },
      {
        property: "og:description",
        content: "Your career goal, progress, next step and weekly milestones — guided by your AI mentor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [prompt, setPrompt] = useState<{ text: string; id: number } | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, career_goal")
        .eq("user_id", data.user.id)
        .maybeSingle();
      setName(profile?.full_name || data.user.email?.split("@")[0] || "Genius");
      setGoal(profile?.career_goal || null);
    });
  }, []);

  const ask = (text: string) => setPrompt({ text, id: Date.now() });

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        <header className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-display text-sm font-semibold">
            <Sparkles className="size-4 text-primary" />
            Skill Maps
          </span>
          <div className="flex items-center gap-3">
            <ConnectProfiles />
            <button
              type="button"
              onClick={handleSignOut}
              title="Sign out"
              className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary/70"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </header>

        <h1 className="mt-8 text-4xl font-bold leading-tight md:text-5xl">
          {name ? (
            <>
              Hey {name}, <span className="text-brand-gradient">where next?</span>
            </>
          ) : (
            <>
              Where do you want to <span className="text-brand-gradient">go next?</span>
            </>
          )}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {goal ? `Goal: ${goal}. Answer three questions and get one clear path.` : "Answer three questions and get one clear path."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => ask("Help me create my career path")}
            className="bg-brand-gradient shadow-brand flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <Compass className="size-4" />
            Create career path
          </button>
          <button
            type="button"
            onClick={() => ask("I'm confused about what to learn next")}
            className="bg-brand-gradient shadow-brand flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            <HelpCircle className="size-4" />
            I'm confused
          </button>
        </div>

        <div className="mt-10">
          <Dashboard />
        </div>

        <div className="mt-10">
          <MentorPanel pendingPrompt={prompt} />
        </div>
      </div>
    </main>
  );
}
