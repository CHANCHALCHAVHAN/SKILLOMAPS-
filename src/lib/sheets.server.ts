const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets/v4";

function headers() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const connectionKey = process.env["GOOGLE_SHEETS_API_KEY"];
  if (!lovableKey || !connectionKey) throw new Error("Google Sheets connection is not configured.");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": connectionKey,
    "Content-Type": "application/json",
  };
}

function sheetId() {
  const id = process.env["SKILL_MAPS_SPREADSHEET_ID"];
  if (!id) throw new Error("SKILL_MAPS_SPREADSHEET_ID is not set.");
  return id;
}

async function call(path: string, init?: RequestInit) {
  const res = await fetch(`${GATEWAY}/spreadsheets/${sheetId()}${path}`, {
    ...init,
    headers: headers(),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Google Sheets request failed [${res.status}]: ${body}`);
    throw new Error(`Google Sheets request failed [${res.status}]: ${body}`);
  }
  return res.json() as Promise<any>;
}

async function readTab(tab: string, lastCol: string): Promise<string[][]> {
  const data = await call(`/values/${tab}!A2:${lastCol}`);
  return (data.values ?? []) as string[][];
}

/**
 * Replaces every row belonging to `userId` (column A) in `tab` with `rows`,
 * keeping other users' rows untouched.
 */
export async function replaceUserRows(
  tab: string,
  lastCol: string,
  userId: string,
  rows: (string | number)[][],
) {
  const existing = await readTab(tab, lastCol);
  const kept = existing.filter((r) => r[0] !== userId);
  const next = [...kept, ...rows];

  await call(`/values/${tab}!A2:${lastCol}:clear`, { method: "POST", body: "{}" });
  if (next.length === 0) return;

  await call(`/values/${tab}!A2?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ range: `${tab}!A2`, majorDimension: "ROWS", values: next }),
  });
}

export const SPREADSHEET_URL = () =>
  `https://docs.google.com/spreadsheets/d/${sheetId()}/edit`;
