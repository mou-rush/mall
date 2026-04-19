export function parseNumeric(val: string): {
  num: number;
  prefix: string;
  suffix: string;
} {
  const match = val.match(/^([#$]?)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, prefix: "", suffix: val };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}

export function fmt(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}
