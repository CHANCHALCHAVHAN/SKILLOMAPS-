import { useEffect, useState } from "react";
import { Code2, Github, Linkedin, Trophy, RefreshCw, Save } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { syncMyDataToSheets } from "@/lib/sheets.functions";

const PROVIDERS = [
  { id: "github", label: "GitHub", icon: Github, note: "Repos, commits, languages", placeholder: "https://github.com/username" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, note: "Experience, endorsements", placeholder: "https://linkedin.com/in/username" },
  { id: "leetcode", label: "LeetCode", icon: Code2, note: "DSA problem history", placeholder: "https://leetcode.com/u/username" },
  { id: "hackerrank", label: "HackerRank", icon: Trophy, note: "Certificates, badges", placeholder: "https://hackerrank.com/profile/username" },
];

const LINKEDIN_FIELDS = [
  { key: "headline", label: "Headline", placeholder: "CS student · aspiring backend engineer" },
  { key: "current_title", label: "Current role", placeholder: "Software Engineering Intern" },
  { key: "company", label: "Company / college", placeholder: "Acme Corp" },
  { key: "location", label: "Location", placeholder: "Pune, India" },
] as const;

type LinkedInState = {
  profile_url: string;
  headline: string;
  current_title: string;
  company: string;
  location: string;
  summary: string;
  skills: string;
};

const EMPTY_LI: LinkedInState = {
  profile_url: "",
  headline: "",
  current_title: "",
  company: "",
  location: "",
  summary: "",
  skills: "",
};

export function ConnectAccountsForm() {
  const [userId, setUserId] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [li, setLi] = useState<LinkedInState>(EMPTY_LI);
  const [saving, setSaving] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const sync = useServerFn(syncMyDataToSheets);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const uid = data.user?.id;
      if (!uid) return;
      setUserId(uid);

      const [{ data: accounts }, { data: linkedin }] = await Promise.all([
        supabase.from("connected_accounts").select("provider, profile_url").eq("user_id", uid),
        supabase.from("linkedin_profiles").select("*").eq("user_id", uid).maybeSingle(),
      ]);

      setUrls(Object.fromEntries((accounts ?? []).map((a) => [a.provider, a.profile_url ?? ""])));
      if (linkedin) {
        setLi({
          profile_url: linkedin.profile_url ?? "",
          headline: linkedin.headline ?? "",
          current_title: linkedin.current_title ?? "",
          company: linkedin.company ?? "",
          location: linkedin.location ?? "",
          summary: linkedin.summary ?? "",
          skills: (linkedin.skills ?? []).join(", "),
        });
      }
    });
  }, []);

  const save = async () => {
    if (!userId) return;
    setSaving(true);

    const rows = PROVIDERS.filter((p) => (urls[p.id] ?? "").trim()).map((p) => ({
      user_id: userId,
      provider: p.id,
      profile_url: urls[p.id]!.trim(),
      handle: urls[p.id]!.trim().split("/").filter(Boolean).pop() ?? null,
      last_synced_at: new Date().toISOString(),
    }));

    const errors: string[] = [];

    if (rows.length) {
      const { error } = await supabase
        .from("connected_accounts")
        .upsert(rows, { onConflict: "user_id,provider" });
      if (error) errors.push(error.message);
    }

    const { error: liError } = await supabase.from("linkedin_profiles").upsert(
      {
        user_id: userId,
        profile_url: li.profile_url.trim() || urls["linkedin"]?.trim() || null,
        headline: li.headline.trim() || null,
        current_title: li.current_title.trim() || null,
        company: li.company.trim() || null,
        location: li.location.trim() || null,
        summary: li.summary.trim() || null,
        raw_text: li.summary.trim() || null,
        skills: li.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      },
      { onConflict: "user_id" },
    );
    if (liError) errors.push(liError.message);

    setSaving(false);
    if (errors.length) toast.error(errors[0]!);
    else toast.success("Saved. Your learner profile is updated.");
  };

  const pushToSheets = async () => {
    setSyncing(true);
    try {
      await sync({ data: undefined });
      toast.success("Synced to your Google Sheet.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Profile links</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Secure permission — only public skill signals are read.
        </p>
        <div className="mt-5 space-y-4">
          {PROVIDERS.map((p) => (
            <label key={p.id} className="block">
              <span className="flex items-center gap-2 text-sm font-medium">
                <p.icon className="size-4 text-primary" />
                {p.label}
                <span className="text-xs font-normal text-muted-foreground">· {p.note}</span>
              </span>
              <input
                value={urls[p.id] ?? ""}
                onChange={(e) => setUrls((u) => ({ ...u, [p.id]: e.target.value }))}
                placeholder={p.placeholder}
                className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Linkedin className="size-4 text-primary" /> LinkedIn details
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Paste what's on your LinkedIn — your mentor uses it to map experience to milestones.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {LINKEDIN_FIELDS.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs text-muted-foreground">{f.label}</span>
              <input
                value={li[f.key]}
                onChange={(e) => setLi((s) => ({ ...s, [f.key]: e.target.value }))}
                placeholder={f.placeholder}
                className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </label>
          ))}
          <label className="block sm:col-span-2">
            <span className="text-xs text-muted-foreground">Skills (comma separated)</span>
            <input
              value={li.skills}
              onChange={(e) => setLi((s) => ({ ...s, skills: e.target.value }))}
              placeholder="Java, SQL, React, Docker"
              className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs text-muted-foreground">About / experience summary</span>
            <textarea
              value={li.summary}
              onChange={(e) => setLi((s) => ({ ...s, summary: e.target.value }))}
              rows={5}
              placeholder="Paste your LinkedIn About section and roles here."
              className="mt-1 w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={save}
          disabled={saving || !userId}
          className="bg-brand-gradient shadow-brand flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Save className="size-4" />
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={pushToSheets}
          disabled={syncing}
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-7 py-3.5 text-sm font-medium transition-colors hover:bg-secondary/70 disabled:opacity-60"
        >
          <RefreshCw className={syncing ? "size-4 animate-spin" : "size-4"} />
          {syncing ? "Syncing…" : "Sync to Google Sheets"}
        </button>
      </div>
    </div>
  );
}
