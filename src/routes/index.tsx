import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skill Maps — Sign in to Your AI Career Mentor" },
      {
        name: "description",
        content:
          "Sign in or create your Skill Maps account to get a personalized career path, weekly milestones and a talking AI mentor.",
      },
      { property: "og:title", content: "Skill Maps — Sign in to Your AI Career Mentor" },
      {
        property: "og:description",
        content:
          "Skill Maps turns your GitHub, LinkedIn and LeetCode activity into a clear career path. Sign in to start.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});
