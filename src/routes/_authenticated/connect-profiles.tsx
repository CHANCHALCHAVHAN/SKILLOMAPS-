import { createFileRoute } from "@tanstack/react-router";
import { ConnectAccountsForm } from "@/components/ConnectAccountsForm";

export const Route = createFileRoute("/_authenticated/connect-profiles")({
  head: () => ({
    meta: [
      { title: "Connect Profiles — Skill Maps" },
      { name: "description", content: "Securely connect GitHub, LinkedIn, LeetCode and HackerRank so your mentor sees real skill signals." },
      { property: "og:title", content: "Connect Profiles — Skill Maps" },
      { property: "og:description", content: "Connect your developer and career profiles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConnectProfilesPage,
});

function ConnectProfilesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        Connect <span className="text-brand-gradient">Profiles</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Give secure permission once. Skill Maps reads only public skill signals — repos, roles,
        problems solved and certificates — to keep your learner profile up to date.
      </p>
      <div className="mt-8">
        <ConnectAccountsForm />
      </div>
    </div>
  );
}
