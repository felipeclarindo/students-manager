export function generateId(): string {
  const timestamp = Date.now();
  const randomPart = Math.floor(Math.random() * 1e6);
  return `${timestamp}${randomPart}`;
}

export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(" ");
}
