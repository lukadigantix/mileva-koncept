/**
 * Date helpers shared by the booking client + server. Dates are ISO
 * `YYYY-MM-DD` strings (from native date inputs); checkout is exclusive.
 */
export function nightsBetween(checkin: string, checkout: string): number {
  if (!checkin || !checkout) return 0;
  const a = Date.parse(checkin);
  const b = Date.parse(checkout);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}
