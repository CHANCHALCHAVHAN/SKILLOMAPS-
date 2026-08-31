export const GREETING = "Hey! I'm your AI mentor. What are you working on today?";

export type MentorTurn = { role: "mentor" | "you"; text: string };

const RULES: [RegExp, string][] = [
  [
    /confus|lost|stuck|don.?t know|overwhelm/,
    "Let's cut through the noise. Pick one goal, one project, one hour a day. Your biggest gap right now is System Design at 25% — start there for 30 minutes today.",
  ],
  [
    /what.*(learn|study|do|start|next)|where.*start/,
    "Based on your skill gaps: System Design is your weakest at 25%, then Data Structures at 45%. Tackle System Design first — it unlocks everything else for a backend role.",
  ],
  [
    /course|resource|recommend|suggest|material/,
    "Top picks for you right now: (1) System Design Fundamentals on Educative — closes your biggest gap. (2) Data Structures & Algorithms on Coursera — pushes your DSA from 45% to 70%+. Both are in My Path with direct links.",
  ],
  [
    /why.*(recommend|suggest|this|course|path)|reason/,
    "Every recommendation is ranked by your skill gap size. System Design at 25% is your #1 gap, so it gets the top course slot. Data Structures at 45% is #2. I only show courses whose prerequisites you've already met.",
  ],
  [
    /github|linkedin|leetcode|hackerrank|profile|connect/,
    "Connect your GitHub, LinkedIn, LeetCode and HackerRank once. I'll read your repos, problem history and experience to build a real skill map — no guessing.",
  ],
  [
    /goal|career|become|path|roadmap|plan/,
    "Tell me your target role in plain words. I'll find your skill gaps, rank them by impact, and give you one clear next step — not a 50-item list.",
  ],
  [
    /week|sunday|milestone|progress|track/,
    "Every Sunday I refresh your milestones from your actual progress. The path adapts to how fast you learn — not a fixed schedule.",
  ],
  [
    /interview|job|resume|hire/,
    "Interview prep = 3 tracks: 50 curated problems, 2 portfolio projects with real users, and a story for each project. I'll spread them across 4 weeks so it's not overwhelming.",
  ],
  [
    /skill|assess|test|level|how good/,
    "Your current levels — React: 78%, SQL: 60%, Data Structures: 45%, Cloud: 35%, System Design: 25%. Go to Skills and drag the sliders to update your self-assessment anytime.",
  ],
  [
    /time|hour|schedule|busy|fast/,
    "Even 45 minutes a day compounds fast. I'll break each milestone into 3 focused sessions so you always know exactly what to do when you sit down.",
  ],
  [
    /prerequisite|order|sequence|before/,
    "Prerequisites are enforced in My Path — each stage unlocks the next. You can't jump to System Design until Graphs is done, because the mental models build on each other.",
  ],
];

export function mentorReply(input: string): string {
  const q = input.toLowerCase();
  const match = RULES.find(([pattern]) => pattern.test(q));
  return match
    ? match[1]
    : "Good question. Your highest-impact move right now: finish your active milestone (Graphs BFS/DFS), then check My Path for the next recommended course with a full explanation of why.";
}
