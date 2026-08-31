import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "@/components/AuthPage";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Skill Maps — Sign in" },
      {
        name: "description",
        content: "Sign in or create your Skill Maps account to get your personalized career path.",
      },
      { property: "og:title", content: "Skill Maps — Sign in" },
      {
        property: "og:description",
        content: "Sign in or create your Skill Maps account to get your personalized career path.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});
