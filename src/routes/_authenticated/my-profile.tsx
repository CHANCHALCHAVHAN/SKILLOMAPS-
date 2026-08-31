import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/my-profile")({
  head: () => ({
    meta: [
      { title: "My Profile — Skill Maps" },
      { name: "description", content: "Your name, email and career goal — the basis of every recommendation." },
      { property: "og:title", content: "My Profile — Skill Maps" },
      { property: "og:description", content: "Your name, email and career goal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MyProfilePage,
});

function MyProfilePage() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setEmail(data.user.email ?? "");
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, career_goal")
        .eq("user_id", data.user.id)
        .maybeSingle();
      setFullName(profile?.full_name ?? "");
      setCareerGoal(profile?.career_goal ?? "");
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { data } = await supabase.auth.getUser();
    if (!data.user) return setSaving(false);
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, career_goal: careerGoal })
      .eq("user_id", data.user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Profile updated");
  };

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="text-3xl font-bold md:text-4xl">
        My <span className="text-brand-gradient">Profile</span>
      </h1>

      <form onSubmit={save} className="mt-8 space-y-4 rounded-2xl border border-border bg-card p-6">
        <label className="block">
          <span className="text-xs text-muted-foreground">Email</span>
          <input
            value={email}
            disabled
            className="mt-1 w-full rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground"
          />
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="text-xs text-muted-foreground">Career goal</span>
          <input
            value={careerGoal}
            onChange={(e) => setCareerGoal(e.target.value)}
            placeholder="e.g. Backend Engineer in 6 months"
            className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={saving}
          className="bg-brand-gradient shadow-brand w-full rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
