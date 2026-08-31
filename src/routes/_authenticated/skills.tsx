import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/skills")({
  head: () => ({
    meta: [{ title: "Skills — Skill Maps" }],
  }),
  component: SkillsPage,
});

const INITIAL_SKILLS = [
  { skill: "React / frontend", level: 78, source: "GitHub", target: 85, why: "Strong already. A few performance patterns will make you interview-ready." },
  { skill: "SQL & data modeling", level: 60, source: "HackerRank", target: 80, why: "Backend roles need advanced SQL — schema design, indexing, and query optimisation." },
  { skill: "Data structures", level: 45, source: "LeetCode", target: 75, why: "DSA is tested in every backend interview. Closing this gap is your #2 priority." },
  { skill: "Cloud & deployment", level: 35, source: "GitHub", target: 70, why: "You need to deploy your own services. Docker + AWS basics will get you there." },
  { skill: "System design", level: 25, source: "Gap", target: 65, why: "Your biggest gap. System design separates junior from mid-level backend engineers." },
];

const LEVELS = ["Beginner", "Learning", "Familiar", "Confident", "Expert"] as const;

function levelLabel(n: number) {
  return LEVELS[Math.round((n / 100) * 4)] ?? "Beginner";
}

function SkillsPage() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [saved, setSaved] = useState(false);

  const update = (i: number, val: number) => {
    setSaved(false);
    setSkills((s) => s.map((sk, idx) => (idx === i ? { ...sk, level: val } : sk)));
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        Your <span className="text-brand-gradient">Skills</span>
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Drag each slider to your honest self-assessment. Your path updates instantly.
      </p>

      <ul className="mt-8 space-y-4">
        {skills.map((s, i) => {
          const gap = s.target - s.level;
          return (
            <li key={s.skill} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{s.skill}</span>
                <span className="text-xs text-muted-foreground">
                  {levelLabel(s.level)} · {s.source}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={s.level}
                  onChange={(e) => update(i, Number(e.target.value))}
                  className="h-2 flex-1 cursor-pointer accent-primary"
                />
                <span className="w-9 text-right text-xs font-semibold tabular-nums">{s.level}%</span>
              </div>

              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Target: {s.target}%</span>
                <span
                  className={cn(
                    "font-medium",
                    gap > 30 ? "text-destructive" : gap > 10 ? "text-amber-500" : "text-primary",
                  )}
                >
                  {gap > 0 ? `${gap}% gap` : "On target ✓"}
                </span>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-xl bg-secondary/60 px-3 py-2.5 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
                {s.why}
              </div>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={() => setSaved(true)}
        className="bg-brand-gradient shadow-brand mt-6 rounded-full px-8 py-3 text-sm font-semibold text-primary-foreground"
      >
        {saved ? "Saved ✓" : "Save self-assessment"}
      </button>

      {saved && (
        <p className="mt-3 text-xs text-muted-foreground">
          Your path and recommendations have been updated based on your new skill levels.
        </p>
      )}
    </div>
  );
}
