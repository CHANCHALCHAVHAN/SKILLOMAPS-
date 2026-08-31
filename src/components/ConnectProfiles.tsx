import { useState } from "react";
import { Check, Github, Linkedin, Link2, Code2, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const PROVIDERS = [
  { id: "github", label: "GitHub", icon: Github, note: "Repos, commits, languages" },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, note: "Experience, endorsements" },
  { id: "leetcode", label: "LeetCode", icon: Code2, note: "DSA problem history" },
  { id: "hackerrank", label: "HackerRank", icon: Trophy, note: "Certificates, badges" },
];

export function ConnectProfiles() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setConnected((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-border bg-secondary px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary/70"
      >
        <Link2 className="size-4" />
        Connect profiles
        {connected.length > 0 && (
          <span className="bg-brand-gradient rounded-full px-2 py-0.5 text-xs text-primary-foreground">
            {connected.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-3 w-80 rounded-2xl border border-border bg-popover p-3 shadow-brand-soft">
          <p className="px-2 pb-2 text-xs text-muted-foreground">
            Secure permission — we only read public skill signals.
          </p>
          {PROVIDERS.map((p) => {
            const isOn = connected.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggle(p.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-secondary",
                  isOn && "bg-secondary",
                )}
              >
                <p.icon className="size-4 shrink-0" />
                <span className="flex-1">
                  <span className="block text-sm font-medium">{p.label}</span>
                  <span className="block text-xs text-muted-foreground">{p.note}</span>
                </span>
                {isOn ? (
                  <Check className="size-4 text-primary" />
                ) : (
                  <span className="text-xs text-muted-foreground">Connect</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
