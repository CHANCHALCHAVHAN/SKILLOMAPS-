import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, HelpCircle, Sparkles } from "lucide-react";
import { ConnectProfiles } from "@/components/ConnectProfiles";
import { Dashboard } from "@/components/Dashboard";
import { MentorPanel } from "@/components/MentorPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skill Maps — AI Career Mentor & Learning Path" },
      {
        name: "description",
        content:
          "Skill Maps turns your GitHub, LinkedIn and LeetCode activity into a clear career path with weekly milestones and a talking AI mentor.",
      },
      { property: "og:title", content: "Skill Maps — AI Career Mentor & Learning Path" },
      {
        property: "og:description",
        content:
          "Answer three questions and get one clear path. Skill gaps, next steps and weekly goals, guided by a voice AI mentor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [prompt, setPrompt] = useState<string | null>(null);

  const ask = (text: string) => setPrompt(`${text} #${Date.now()}`.replace(/ #\d+$/, ""));

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "var(--gradient-brand)" }}
      />

      <div className="relative mx-auto max-w-3xl">
        <header className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display text-sm font-semibold">
            <Sparkles className="size-4 text-primary" />
            Skill Maps
          </span>
          <ConnectProfiles />
        </header>

        <h1 className="mt-8 text-4xl font-bold leading-tight md:text-5xl">
          Where do you want to <span className="text-brand-gradient">go next?</span>
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Answer three questions and get one clear path.
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
