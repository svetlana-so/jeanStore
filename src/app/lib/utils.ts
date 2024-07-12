export function getUniqueValues(data: any[], attribute: string): string[] {
  return Array.from(new Set(data.map((item) => item[attribute])));
}
