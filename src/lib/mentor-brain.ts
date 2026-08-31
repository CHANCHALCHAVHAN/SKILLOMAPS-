export const GREETING = "Hii Genuis , How I Can help u today ?";

export type MentorTurn = { role: "mentor" | "you"; text: string };

/** Lightweight local mentor logic for the prototype. */
export function mentorReply(input: string): string {
  const q = input.toLowerCase();

  if (/confus|lost|stuck|don't know|dont know/.test(q)) {
    return "That's normal. Let's simplify: pick one goal, one project, and one hour a day. I suggest starting with your weakest skill gap — data structures — and shipping one small project this week.";
  }
  if (/github|linkedin|leetcode|hackerrank|profile|connect/.test(q)) {
    return "Connect your GitHub, LinkedIn, LeetCode and HackerRank profiles and I will read your repositories, problem-solving activity and experience to build an updated learner profile with real skill evidence.";
  }
  if (/goal|career|become|path|roadmap/.test(q)) {
    return "Tell me your target role in simple words. I will map your current skills, find the gaps, and order the right courses, projects and assessments so you always know the next single step.";
  }
  if (/week|sunday|milestone|progress/.test(q)) {
    return "Every Sunday I refresh your weekly milestones using your progress and feedback, so the path keeps adapting to how fast you actually learn.";
  }
  if (/interview|job|resume/.test(q)) {
    return "For interviews, we combine three tracks: fifty curated problems, two portfolio projects with real users, and a story for each project. I will schedule them across four weeks.";
  }
  return "Good question. Based on your current profile, the highest-impact next step is to finish your active milestone, then take a short assessment so I can re-check your skill gaps.";
}
