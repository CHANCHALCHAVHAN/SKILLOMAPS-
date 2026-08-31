import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Skill Maps" },
      { name: "description", content: "What you already know and where the gaps are, gathered from your connected profiles." },
      { property: "og:title", content: "Skills — Skill Maps" },
      { property: "og:description", content: "Your verified skills and current gaps." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SkillsPage,
});

const SKILLS = [
  { skill: "React / frontend", level: 78, source: "GitHub" },
  { skill: "SQL & data modeling", level: 60, source: "HackerRank" },
  { skill: "Data structures", level: 45, source: "LeetCode" },
  { skill: "System design", level: 25, source: "Gap" },
  { skill: "Cloud & deployment", level: 35, source: "GitHub" },
];

function SkillsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        Your <span className="text-brand-gradient">Skills</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Built from your connected GitHub, LinkedIn, LeetCode and HackerRank activity.
      </p>

      <ul className="mt-8 space-y-4">
        {SKILLS.map((s) => (
          <li key={s.skill} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{s.skill}</span>
              <span className="text-muted-foreground">{s.level}% · {s.source}</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-secondary">
              <div className="bg-brand-gradient h-2 rounded-full" style={{ width: `${s.level}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
