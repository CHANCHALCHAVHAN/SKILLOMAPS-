import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock, CheckCircle2, ChevronDown, ChevronUp, ExternalLink, Flag, ThumbsDown, ThumbsUp } from "lucide-react";
import { getRecommendations } from "@/lib/recommender";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/my-path")({
  head: () => ({
    meta: [{ title: "My Path — Skill Maps" }],
  }),
  component: MyPathPage,
});

const PROFILE = {
  goal: "Backend Engineer",
  skills: [
    { skill: "System design", level: 25 },
    { skill: "Data structures", level: 45 },
    { skill: "Cloud & deployment", level: 35 },
    { skill: "SQL & data modeling", level: 60 },
    { skill: "React / frontend", level: 78 },
  ],
  completedIds: [] as string[],
};

const STAGES = [
  {
    title: "Foundations",
    detail: "Arrays, hashing, complexity — 2 weeks",
    state: "done",
    why: "Every backend role tests fundamentals. Without these, system design and DSA interviews fall apart.",
    resources: [
      { label: "CS50 Introduction to Computer Science", url: "https://cs50.harvard.edu" },
      { label: "Big-O Cheat Sheet", url: "https://bigocheatsheet.com" },
    ],
  },
  {
    title: "Backend core",
    detail: "REST, auth, PostgreSQL — 3 weeks",
    state: "done",
    why: "REST APIs and SQL are the daily tools of a backend engineer. You need these before system design makes sense.",
    resources: [
      { label: "Node.js REST API Tutorial", url: "https://nodejs.org" },
      { label: "PostgreSQL Tutorial", url: "https://postgresqltutorial.com" },
    ],
  },
  {
    title: "Graphs & problem solving",
    detail: "BFS/DFS, 12 problems — this week",
    state: "active",
    why: "Graph problems appear in 60% of backend interviews. Finishing this unlocks system design topics.",
    resources: [
      { label: "NeetCode Graphs Playlist", url: "https://neetcode.io" },
      { label: "LeetCode Graph Problems", url: "https://leetcode.com/tag/graph" },
    ],
  },
  {
    title: "System design basics",
    detail: "Caching, queues, scaling — 3 weeks",
    state: "todo",
    why: "System design is your biggest gap at 25%. This stage directly targets your weakest skill.",
    resources: [
      { label: "System Design Fundamentals — Educative", url: "https://educative.io" },
      { label: "Grokking System Design", url: "https://educative.io" },
    ],
  },
  {
    title: "Capstone project",
    detail: "Ship + deploy a full service",
    state: "todo",
    why: "A deployed project is proof of skill. Interviewers want to see real code, not just theory.",
    resources: [
      { label: "Docker & Kubernetes for Developers", url: "https://udemy.com" },
      { label: "AWS Cloud Practitioner Essentials", url: "https://aws.amazon.com/training" },
    ],
  },
];

function MyPathPage() {
  const [expanded, setExpanded] = useState<string | null>("Graphs & problem solving");
  const [feedback, setFeedback] = useState<Record<string, "up" | "down">>({});
  const recs = getRecommendations(PROFILE, 3);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        My <span className="text-brand-gradient">Path</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Goal: Backend Engineer — 6 months. Each stage unlocks the next.
      </p>

      <ol className="mt-8 space-y-3">
        {STAGES.map((s, i) => {
          const isOpen = expanded === s.title;
          return (
            <li key={s.title} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : s.title)}
                className="flex w-full items-center gap-4 p-5 text-left"
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    s.state === "todo"
                      ? "border border-border text-muted-foreground"
                      : "bg-brand-gradient text-primary-foreground",
                  )}
                >
                  {s.state === "done" ? <CheckCircle2 className="size-4" /> : i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-semibold">{s.title}</span>
                  <span className="block text-sm text-muted-foreground">{s.detail}</span>
                </span>
                {s.state === "active" && <Flag className="size-4 shrink-0 text-primary" />}
                {isOpen ? (
                  <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
                )}
              </button>

              {isOpen && (
                <div className="border-t border-border px-5 pb-5 pt-4 space-y-4">
                  <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 text-sm text-foreground">
                    <span className="font-semibold text-primary">Why this stage? </span>
                    {s.why}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-2">Resources</p>
                    <ul className="space-y-2">
                      {s.resources.map((r) => (
                        <li key={r.label}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="size-3.5 shrink-0" />
                            {r.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">Was this helpful?</span>
                    <button
                      type="button"
                      onClick={() => setFeedback((f) => ({ ...f, [s.title]: "up" }))}
                      className={cn(
                        "flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors",
                        feedback[s.title] === "up"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      <ThumbsUp className="size-3" /> Yes
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedback((f) => ({ ...f, [s.title]: "down" }))}
                      className={cn(
                        "flex items-center gap-1 rounded-full border px-3 py-1 text-xs transition-colors",
                        feedback[s.title] === "down"
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border hover:bg-secondary",
                      )}
                    >
                      <ThumbsDown className="size-3" /> Too hard
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">
          Recommended <span className="text-brand-gradient">next courses</span>
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">Ranked by your biggest skill gaps.</p>
        <ul className="mt-4 space-y-3">
          {recs.map((c) => (
            <li key={c.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{c.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {c.platform} · {c.duration} · {c.level}
                  </p>
                </div>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-gradient shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold text-primary-foreground"
                >
                  Start
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                <span className="font-semibold text-primary">Why: </span>{c.why}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarClock className="size-4" />
        Path re-planned every Sunday from your progress and feedback.
      </p>
    </div>
  );
}
