import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/**
 * Pushes the signed-in student's profile, connected accounts, LinkedIn details
 * and milestones into the Skill Maps Google Sheet.
 */
export const syncMyDataToSheets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { replaceUserRows, SPREADSHEET_URL } = await import("./sheets.server");
    const { supabase, userId, claims } = context;
    const now = new Date().toISOString();

    const [{ data: profile }, { data: accounts }, { data: linkedin }, { data: milestones }] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("connected_accounts").select("*").eq("user_id", userId),
        supabase.from("linkedin_profiles").select("*").eq("user_id", userId).maybeSingle(),
        supabase.from("milestones").select("*").eq("user_id", userId).order("position"),
      ]);

    const email = (claims as { email?: string } | undefined)?.email ?? "";

    await replaceUserRows("Users", "F", userId, [
      [
        userId,
        email,
        profile?.full_name ?? "",
        profile?.career_goal ?? "",
        profile?.created_at ?? now,
        now,
      ],
    ]);

    await replaceUserRows(
      "Accounts",
      "F",
      userId,
      (accounts ?? []).map((a) => [
        userId,
        a.provider,
        a.profile_url ?? "",
        a.handle ?? "",
        JSON.stringify(a.details ?? {}),
        a.last_synced_at ?? now,
      ]),
    );

    await replaceUserRows(
      "LinkedIn",
      "I",
      userId,
      linkedin
        ? [
            [
              userId,
              linkedin.profile_url ?? "",
              linkedin.headline ?? "",
              linkedin.current_title ?? "",
              linkedin.company ?? "",
              linkedin.location ?? "",
              linkedin.summary ?? "",
              (linkedin.skills ?? []).join(", "),
              linkedin.updated_at ?? now,
            ],
          ]
        : [],
    );

    await replaceUserRows(
      "Milestones",
      "F",
      userId,
      (milestones ?? []).map((m) => [
        userId,
        m.week_start,
        m.title,
        m.detail ?? "",
        m.status,
        m.updated_at ?? now,
      ]),
    );

    return { ok: true, url: SPREADSHEET_URL() };
  });
