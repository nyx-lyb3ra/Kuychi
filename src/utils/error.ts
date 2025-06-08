import GLib from "gi://GLib";

export function gerrorMatches<Args extends unknown[]>(
  error: unknown,
  domain: new (...args: Args) => GLib.Error,
  code: number,
): boolean {
  if (!(error instanceof GLib.Error)) return false;
  return error.matches(domain, code);
}
