import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/Dashboard";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Skill Maps" },
      { name: "description", content: "Weekly milestones, completion rate and what changed since last Sunday." },
      { property: "og:title", content: "Progress — Skill Maps" },
      { property: "og:description", content: "Weekly milestones and completion rate." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        Your <span className="text-brand-gradient">Progress</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Milestones refresh every Sunday based on what you actually finished.
      </p>
      <div className="mt-8">
        <Dashboard />
      </div>
    </div>
  );
}
