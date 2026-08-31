import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const LINKS = [
  { to: "/dashboard", label: "Home" },
  { to: "/my-path", label: "My Path" },
  { to: "/skills", label: "Skills" },
  { to: "/progress", label: "Progress" },
  { to: "/my-profile", label: "My Profile" },
  { to: "/connect-profiles", label: "Connect Profiles" },
  { to: "/ai-mentor", label: "AI Mentor" },
] as const;

export function AppNav() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <nav className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3">
        <Link to="/dashboard" className="flex items-center gap-2 font-display text-sm font-semibold">
          <Sparkles className="size-4 text-primary" />
          Skill Maps
        </Link>

        <div className="flex flex-1 flex-wrap items-center gap-x-4 gap-y-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-sm text-foreground font-semibold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          title="Sign out"
          className="flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/70"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </nav>
  );
}
