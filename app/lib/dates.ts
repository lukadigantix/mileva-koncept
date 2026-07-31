/**
 * Date helpers shared by the booking client + server. Dates are ISO
 * `YYYY-MM-DD` strings (they sort and compare correctly with `<`), and a stay is
 * a half-open range: check-in inclusive, check-out exclusive. A "night" is
 * therefore identified by the date it starts on - a stay 10 → 14 occupies the
 * nights 10, 11, 12 and 13, which is why the 14th can be someone else's arrival.
 *
 * All arithmetic goes through `Date.UTC`, so a day is always exactly 86 400 000
 * ms and the summer clock change never shifts a date by one.
 */

/** ISO date → milliseconds at UTC midnight. NaN for anything malformed. */
function toMs(iso: string): number {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return NaN;
  return Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
}

/** Milliseconds at UTC midnight → ISO date. */
function toISO(ms: number): string {
  const d = new Date(ms);
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${d.getUTCFullYear()}-${mm}-${dd}`;
}

export function isISODate(value: string): boolean {
  return !Number.isNaN(toMs(value));
}

export function nightsBetween(checkin: string, checkout: string): number {
  const a = toMs(checkin);
  const b = toMs(checkout);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

/**
 * Today in the *local* calendar of whoever is asking - the guest's own "today"
 * in the browser, the server's in a Server Action. Deliberately not
 * `toISOString()`, which is UTC and would call it yesterday for the whole
 * Belgrade evening after 01:00 CEST.
 */
export function todayISO(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

export function addDays(iso: string, days: number): string {
  const ms = toMs(iso);
  return Number.isNaN(ms) ? iso : toISO(ms + days * 86_400_000);
}

/** Every date in the half-open range [from, to) - i.e. the nights of a stay. */
export function eachNight(from: string, to: string): string[] {
  const nights = nightsBetween(from, to);
  const out: string[] = [];
  for (let i = 0; i < nights; i++) out.push(addDays(from, i));
  return out;
}

/* --------------------------------- Grid ---------------------------------- */

/** The month a date belongs to, as the tuple the calendar grid is built from. */
export function monthOf(iso: string): { year: number; month: number } {
  const ms = toMs(iso);
  const d = new Date(Number.isNaN(ms) ? Date.now() : ms);
  return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
}

/** `month` steps forward (or back) from a year/month pair, normalised. */
export function shiftMonth(
  year: number,
  month: number,
  by: number
): { year: number; month: number } {
  const total = year * 12 + month + by;
  return { year: Math.floor(total / 12), month: ((total % 12) + 12) % 12 };
}

/** First day of a month, as an ISO date. */
export function monthStart(year: number, month: number): string {
  return toISO(Date.UTC(year, month, 1));
}

export function daysInMonth(year: number, month: number): number {
  return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
}

/** A year/month/day triple as an ISO date, with the day clamped to the month. */
export function dateIn(year: number, month: number, day: number): string {
  return toISO(Date.UTC(year, month, Math.min(day, daysInMonth(year, month))));
}

/**
 * Six weeks of cells for one month, Monday-first (the European week). Cells
 * outside the month are `null` so the grid keeps its shape without rendering
 * neighbouring days that would be ambiguous to click.
 */
export function monthGrid(year: number, month: number): (string | null)[] {
  const first = Date.UTC(year, month, 1);
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  // getUTCDay() is Sunday-first; rotate so Monday is column 0.
  const lead = (new Date(first).getUTCDay() + 6) % 7;

  const cells: (string | null)[] = new Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(toISO(Date.UTC(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

/* ------------------------------ Localisation ------------------------------ */

/** "јул 2026" / "jul 2026" / "July 2026" - month + year in the page language. */
export function monthLabel(year: number, month: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month, 1)));
}

/** Monday-first weekday initials for the grid header. */
export function weekdayLabels(locale: string): string[] {
  const fmt = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" });
  // 2024-01-01 was a Monday.
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(Date.UTC(2024, 0, 1 + i)))
  );
}

/** "10. јул 2026." - a single date spelled out for summaries and triggers. */
export function longDate(iso: string, locale: string): string {
  const ms = toMs(iso);
  if (Number.isNaN(ms)) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(ms));
}

/** "10. jul" - the compact form the date fields show. */
export function shortDate(iso: string, locale: string): string {
  const ms = toMs(iso);
  if (Number.isNaN(ms)) return "";
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(ms));
}
