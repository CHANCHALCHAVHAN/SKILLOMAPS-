import { CalendarClock, Compass, Target, TrendingUp } from "lucide-react";

const MILESTONES = [
  { title: "Arrays & hashing — 15 problems", done: true },
  { title: "Ship REST API with auth", done: true },
  { title: "Graphs & BFS/DFS — 12 problems", done: false },
  { title: "Deploy portfolio project v1", done: false },
];

const GAPS = [
  { skill: "Data structures", level: 45 },
  { skill: "System design", level: 25 },
  { skill: "React / frontend", level: 78 },
  { skill: "SQL & data modeling", level: 60 },
];

export function Dashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <article className="rounded-2xl border border-border bg-card p-5">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Target className="size-4 text-primary" /> Current goal
        </p>
        <h3 className="mt-2 text-lg font-semibold">Backend Engineer — 6 months</h3>
        <p className="mt-1 text-sm text-muted-foreground">Set in your own words, refined by your mentor.</p>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <TrendingUp className="size-4 text-primary" /> Progress
        </p>
        <h3 className="mt-2 text-lg font-semibold">52%</h3>
        <div className="mt-3 h-2 rounded-full bg-secondary">
          <div className="bg-brand-gradient h-2 rounded-full" style={{ width: "52%" }} />
        </div>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <Compass className="size-4 text-primary" /> Next step
        </p>
        <h3 className="mt-2 text-lg font-semibold">Graphs: BFS & DFS</h3>
        <p className="mt-1 text-sm text-muted-foreground">~45 min today · then 3 practice problems.</p>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5 md:col-span-2">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <CalendarClock className="size-4 text-primary" /> Weekly milestones — refreshed every Sunday
        </p>
        <ul className="mt-3 space-y-2">
          {MILESTONES.map((m) => (
            <li key={m.title} className="flex items-center gap-3 text-sm">
              <span
                className={
                  m.done
                    ? "bg-brand-gradient size-2.5 rounded-full"
                    : "size-2.5 rounded-full border border-muted-foreground"
                }
              />
              <span className={m.done ? "text-muted-foreground line-through" : ""}>{m.title}</span>
            </li>
          ))}
        </ul>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5">
        <p className="text-xs text-muted-foreground">Skill gaps</p>
        <ul className="mt-3 space-y-3">
          {GAPS.map((g) => (
            <li key={g.skill}>
              <div className="flex justify-between text-xs">
                <span>{g.skill}</span>
                <span className="text-muted-foreground">{g.level}%</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-secondary">
                <div className="bg-brand-gradient h-1.5 rounded-full" style={{ width: `${g.level}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
