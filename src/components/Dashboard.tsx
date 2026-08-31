import { CalendarClock, Compass, ExternalLink, Lightbulb, Target, TrendingUp, Zap } from "lucide-react";
import { getRecommendations } from "@/lib/recommender";

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

const PROFILE = {
  goal: "Backend Engineer",
  skills: [
    { skill: "System design", level: 25 },
    { skill: "Data structures", level: 45 },
    { skill: "Cloud & deployment", level: 35 },
    { skill: "SQL & data modeling", level: 60 },
    { skill: "React / frontend", level: 78 },
  ],
  completedIds: [],
};

const worst = GAPS.reduce((a, b) => (a.level < b.level ? a : b));
const AI_REC = `Your weakest area is ${worst.skill} at ${worst.level}%. Spend 30 min/day here — it's your highest-impact move toward your goal.`;

const nextMilestone = MILESTONES.find((m) => !m.done);
const NEXT_ACTION = nextMilestone
  ? `Up next: "${nextMilestone.title}". Block 45 min today and knock it out — consistency beats intensity.`
  : "All milestones done! Ask your mentor to generate next week's plan.";

const TOP_RECS = getRecommendations(PROFILE, 2);

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

      <article className="rounded-2xl border border-primary/40 bg-primary/5 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold text-primary">
          <Lightbulb className="size-4" /> AI Recommendation
        </p>
        <p className="mt-2 text-sm leading-relaxed">{AI_REC}</p>
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

      <article className="rounded-2xl border border-amber-500/40 bg-amber-500/5 p-5">
        <p className="flex items-center gap-2 text-xs font-semibold text-amber-500">
          <Zap className="size-4" /> Next Action
        </p>
        <p className="mt-2 text-sm leading-relaxed">{NEXT_ACTION}</p>
      </article>

      <article className="rounded-2xl border border-border bg-card p-5 md:col-span-2">
        <p className="text-xs font-semibold text-muted-foreground mb-3">Top recommended courses</p>
        <ul className="space-y-3">
          {TOP_RECS.map((c) => (
            <li key={c.id} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-muted-foreground">{c.platform} · {c.duration}</p>
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium hover:bg-secondary/70"
              >
                <ExternalLink className="size-3" /> Open
              </a>
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
