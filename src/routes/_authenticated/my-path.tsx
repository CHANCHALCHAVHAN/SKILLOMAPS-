import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Compass, Flag } from "lucide-react";

export const Route = createFileRoute("/_authenticated/my-path")({
  head: () => ({
    meta: [
      { title: "My Path — Skill Maps" },
      { name: "description", content: "Your ordered learning path: courses, projects and assessments toward your career goal." },
      { property: "og:title", content: "My Path — Skill Maps" },
      { property: "og:description", content: "Your ordered learning path toward your career goal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyPathPage,
});

const STAGES = [
  { title: "Foundations", detail: "Arrays, hashing, complexity — 2 weeks", state: "done" },
  { title: "Backend core", detail: "REST, auth, PostgreSQL — 3 weeks", state: "done" },
  { title: "Graphs & problem solving", detail: "BFS/DFS, 12 problems — this week", state: "active" },
  { title: "System design basics", detail: "Caching, queues, scaling — 3 weeks", state: "todo" },
  { title: "Capstone project", detail: "Ship + deploy a full service", state: "todo" },
];

function MyPathPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        My <span className="text-brand-gradient">Path</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        <Compass className="mr-1 inline size-4 text-primary" />
        Goal: Backend Engineer — 6 months. Order matters; finish one stage before the next.
      </p>

      <ol className="mt-8 space-y-3">
        {STAGES.map((s, i) => (
          <li
            key={s.title}
            className="flex gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <span
              className={
                s.state === "todo"
                  ? "flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-xs text-muted-foreground"
                  : "bg-brand-gradient flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground"
              }
            >
              {i + 1}
            </span>
            <span className="flex-1">
              <span className="block font-semibold">{s.title}</span>
              <span className="block text-sm text-muted-foreground">{s.detail}</span>
            </span>
            {s.state === "active" && (
              <Flag className="size-4 shrink-0 text-primary" />
            )}
          </li>
        ))}
      </ol>

      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarClock className="size-4" />
        Path re-planned every Sunday from your progress and feedback.
      </p>
    </div>
  );
}
