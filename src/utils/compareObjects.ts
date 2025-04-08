export function getChangedFields<T extends object>(
  original: T,
  updated: T
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key in updated) {
    const originalValue = original[key];
    const updatedValue = updated[key];

    const isEqual =
      JSON.stringify(originalValue) === JSON.stringify(updatedValue);

    if (!isEqual) {
      changed[key] = updatedValue;
    }
  }

  return changed;
}
