import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, CheckCircle2, Circle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/progress")({
  head: () => ({
    meta: [{ title: "Progress — Skill Maps" }],
  }),
  component: ProgressPage,
});

const WEEKLY_HISTORY = [
  { week: "Week 1", completed: 2, total: 3, score: 38 },
  { week: "Week 2", completed: 3, total: 3, score: 44 },
  { week: "Week 3", completed: 2, total: 4, score: 47 },
  { week: "Week 4", completed: 4, total: 4, score: 52 },
];

const MILESTONES = [
  { title: "Arrays & hashing — 15 problems", done: true, week: "Week 1" },
  { title: "Ship REST API with auth", done: true, week: "Week 2" },
  { title: "SQL joins & indexing practice", done: true, week: "Week 2" },
  { title: "BFS/DFS — 6 problems", done: true, week: "Week 3" },
  { title: "Graphs & BFS/DFS — 12 problems", done: false, week: "Week 4" },
  { title: "Deploy portfolio project v1", done: false, week: "Week 4" },
];

const SKILL_GROWTH = [
  { skill: "React / frontend", before: 65, after: 78 },
  { skill: "SQL & data modeling", before: 48, after: 60 },
  { skill: "Data structures", before: 30, after: 45 },
  { skill: "Cloud & deployment", before: 30, after: 35 },
  { skill: "System design", before: 20, after: 25 },
];

const maxScore = Math.max(...WEEKLY_HISTORY.map((w) => w.score));

function ProgressPage() {
  const done = MILESTONES.filter((m) => m.done).length;
  const total = MILESTONES.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-10">
      <div>
        <h1 className="text-3xl font-bold md:text-4xl">
          Your <span className="text-brand-gradient">Progress</span>
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Milestones refresh every Sunday based on what you actually finished.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <TrendingUp className="size-4 text-primary" /> Overall progress
          </p>
          <p className="mt-2 text-3xl font-bold">{pct}%</p>
          <div className="mt-3 h-2 rounded-full bg-secondary">
            <div className="bg-brand-gradient h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Milestones done</p>
          <p className="mt-2 text-3xl font-bold">{done} <span className="text-lg text-muted-foreground">/ {total}</span></p>
          <p className="mt-1 text-xs text-muted-foreground">{total - done} remaining this path</p>
        </article>
        <article className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">Current streak</p>
          <p className="mt-2 text-3xl font-bold">4 <span className="text-lg text-muted-foreground">weeks</span></p>
          <p className="mt-1 text-xs text-muted-foreground">Keep going — next Sunday refresh incoming</p>
        </article>
      </div>

      <section>
        <h2 className="text-base font-semibold">Weekly score history</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Overall skill score across all areas</p>
        <div className="mt-4 flex items-end gap-3 h-32">
          {WEEKLY_HISTORY.map((w) => {
            const height = Math.round((w.score / maxScore) * 100);
            return (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-1">
                <span className="text-xs font-semibold">{w.score}%</span>
                <div className="w-full rounded-t-lg bg-brand-gradient" style={{ height: `${height}%` }} />
                <span className="text-xs text-muted-foreground">{w.week}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-base font-semibold">Skill development</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Before vs. now across your learning path</p>
        <ul className="mt-4 space-y-4">
          {SKILL_GROWTH.map((s) => {
            const gain = s.after - s.before;
            return (
              <li key={s.skill}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{s.skill}</span>
                  <span className={cn("font-semibold", gain > 0 ? "text-primary" : "text-muted-foreground")}>
                    +{gain}%
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-secondary">
                  <div
                    className="absolute h-2 rounded-full bg-secondary/80"
                    style={{ width: `${s.before}%` }}
                  />
                  <div
                    className="absolute h-2 rounded-full bg-brand-gradient transition-all"
                    style={{ width: `${s.after}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Started: {s.before}%</span>
                  <span>Now: {s.after}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="text-base font-semibold flex items-center gap-2">
          <CalendarClock className="size-4 text-primary" /> Milestone history
        </h2>
        <ul className="mt-4 space-y-2">
          {MILESTONES.map((m) => (
            <li key={m.title} className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm">
              {m.done ? (
                <CheckCircle2 className="size-4 shrink-0 text-primary" />
              ) : (
                <Circle className="size-4 shrink-0 text-muted-foreground" />
              )}
              <span className={cn("flex-1", m.done && "text-muted-foreground line-through")}>{m.title}</span>
              <span className="text-xs text-muted-foreground">{m.week}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
