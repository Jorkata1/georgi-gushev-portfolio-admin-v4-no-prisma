export function splitLines(value: string) {
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinLines(values: string[]) {
  return values.join("\n");
}
