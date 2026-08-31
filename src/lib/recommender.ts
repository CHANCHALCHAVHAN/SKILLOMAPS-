export type Course = {
  id: string;
  title: string;
  platform: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  skill: string;
  why: string;
  url: string;
  prerequisite?: string;
};

export type LearnerProfile = {
  goal: string;
  skills: { skill: string; level: number }[];
  completedIds: string[];
};

const COURSES: Course[] = [
  {
    id: "sys-1",
    title: "System Design Fundamentals",
    platform: "Educative",
    duration: "8 hrs",
    level: "Intermediate",
    skill: "System design",
    why: "Your system design score is 25% — the biggest gap between you and a backend role. This course closes it fastest.",
    url: "https://educative.io",
  },
  {
    id: "sys-2",
    title: "Grokking System Design Interview",
    platform: "Educative",
    duration: "12 hrs",
    level: "Advanced",
    skill: "System design",
    why: "After the fundamentals, this maps directly to real interview questions at top companies.",
    url: "https://educative.io",
    prerequisite: "sys-1",
  },
  {
    id: "ds-1",
    title: "Data Structures & Algorithms in Python",
    platform: "Coursera",
    duration: "20 hrs",
    level: "Intermediate",
    skill: "Data structures",
    why: "Your DSA score is 45%. Structured practice here will push you past 70% and unlock harder problems.",
    url: "https://coursera.org",
  },
  {
    id: "ds-2",
    title: "LeetCode Top 75 Problems",
    platform: "LeetCode",
    duration: "Self-paced",
    level: "Intermediate",
    skill: "Data structures",
    why: "Curated 75 problems cover every pattern you'll see in backend interviews. Do 3/day.",
    url: "https://leetcode.com",
    prerequisite: "ds-1",
  },
  {
    id: "cloud-1",
    title: "AWS Cloud Practitioner Essentials",
    platform: "AWS Skill Builder",
    duration: "6 hrs",
    level: "Beginner",
    skill: "Cloud & deployment",
    why: "Cloud is at 35% — backend engineers are expected to deploy. This gives you the vocabulary and hands-on basics.",
    url: "https://aws.amazon.com/training",
  },
  {
    id: "cloud-2",
    title: "Docker & Kubernetes for Developers",
    platform: "Udemy",
    duration: "10 hrs",
    level: "Intermediate",
    skill: "Cloud & deployment",
    why: "Containerisation is the standard for deploying backend services. Pairs directly with your capstone project.",
    url: "https://udemy.com",
    prerequisite: "cloud-1",
  },
  {
    id: "sql-1",
    title: "Advanced SQL for Data Engineers",
    platform: "Mode Analytics",
    duration: "4 hrs",
    level: "Intermediate",
    skill: "SQL & data modeling",
    why: "You're at 60% on SQL. This fills the advanced query and schema design gaps that backend interviews test.",
    url: "https://mode.com/sql-tutorial",
  },
  {
    id: "react-1",
    title: "React Performance Patterns",
    platform: "Frontend Masters",
    duration: "5 hrs",
    level: "Advanced",
    skill: "React / frontend",
    why: "You're already strong at 78%. This keeps your frontend sharp while you focus on backend gaps.",
    url: "https://frontendmasters.com",
  },
];

export function getRecommendations(profile: LearnerProfile, limit = 4): Course[] {
  const sorted = [...profile.skills].sort((a, b) => a.level - b.level);

  return sorted
    .flatMap(({ skill }) =>
      COURSES.filter(
        (c) =>
          c.skill === skill &&
          !profile.completedIds.includes(c.id) &&
          (!c.prerequisite || profile.completedIds.includes(c.prerequisite)),
      ),
    )
    .slice(0, limit);
}

export { COURSES };
