import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, HelpCircle } from "lucide-react";
import { MentorPanel } from "@/components/MentorPanel";

export const Route = createFileRoute("/_authenticated/ai-mentor")({
  head: () => ({
    meta: [
      { title: "AI Mentor — Skill Maps" },
      { name: "description", content: "Talk to your AI mentor by voice or text and get the next clear step." },
      { property: "og:title", content: "AI Mentor — Skill Maps" },
      { property: "og:description", content: "Talk to your AI mentor by voice or text." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AiMentorPage,
});

function AiMentorPage() {
  const [prompt, setPrompt] = useState<{ text: string; id: number } | null>(null);
  const ask = (text: string) => setPrompt({ text, id: Date.now() });

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        AI <span className="text-brand-gradient">Mentor</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Speak or type — your mentor answers out loud.</p>

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

      <div className="mt-8">
        <MentorPanel pendingPrompt={prompt} />
      </div>
    </div>
  );
}
