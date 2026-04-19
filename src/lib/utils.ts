export function parseNumeric(val: string): {
  num: number;
  prefix: string;
  suffix: string;
} {
  const match = val.match(/^([#$]?)(\d+(?:\.\d+)?)(.*)/);
  if (!match) return { num: 0, prefix: "", suffix: val };
  return { num: parseFloat(match[2]), prefix: match[1], suffix: match[3] };
}
