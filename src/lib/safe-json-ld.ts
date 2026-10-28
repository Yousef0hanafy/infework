/** JSON for an HTML script context. JSON escaping alone does not escape HTML end tags. */
export function safeJsonLd(value: unknown): string {
  const json = JSON.stringify(value);
  if (json === undefined) throw new TypeError("Structured data must be JSON serializable.");
  return json
    .replace(/</g, "\\u003c")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
