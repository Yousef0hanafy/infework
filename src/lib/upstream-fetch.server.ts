type Options = { timeoutMs?: number; backoffMs?: number; fetchImpl?: typeof fetch };

function upstreamError(message: string, code: string) {
  return Object.assign(
    new TypeError(`fetch failed: ${message}`, {
      cause: Object.assign(new Error(message), { code }),
    }),
    { code },
  );
}

/** Health-only backoff: no response, identity, credentials or catalogue rows are cached. */
export function createBoundedFetch({
  timeoutMs = 2000,
  backoffMs = 0,
  fetchImpl,
}: Options = {}): typeof fetch {
  const unavailableUntil = new Map<string, number>();
  return async (input, init) => {
    const request = input instanceof Request ? input : undefined;
    const origin = new URL(request?.url ?? String(input)).origin;
    const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
    const readOnly = method === "GET" || method === "HEAD";
    const callerSignal = init?.signal ?? request?.signal;
    if (callerSignal?.aborted) throw callerSignal.reason;
    if (readOnly && (unavailableUntil.get(origin) ?? 0) > Date.now()) {
      throw upstreamError("Upstream connection temporarily unavailable.", "ECONNREFUSED");
    }
    const controller = new AbortController();
    let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
    let rejectAbort: (error: unknown) => void = () => {};
    const aborted = new Promise<never>((_, reject) => {
      rejectAbort = reject;
    });
    const cancel = (reason: unknown) => {
      rejectAbort(reason);
      controller.abort(reason);
      void reader?.cancel(reason).catch(() => {});
    };
    const onCallerAbort = () => cancel(callerSignal?.reason);
    callerSignal?.addEventListener("abort", onCallerAbort, { once: true });
    const timer = setTimeout(
      () => cancel(upstreamError("Upstream request timed out.", "ETIMEDOUT")),
      timeoutMs,
    );
    try {
      const response = await Promise.race([
        (async () => {
          const res = await (fetchImpl ?? fetch)(input, { ...init, signal: controller.signal });
          if (res.status >= 500) {
            void res.body?.cancel().catch(() => {});
            throw upstreamError("Upstream service unavailable.", "ECONNREFUSED");
          }
          // Include body delivery in the deadline. Supabase consumes text/json after fetch resolves.
          if (!res.body) return res;
          reader = res.body.getReader();
          const chunks: Uint8Array[] = [];
          let bytes = 0;
          for (;;) {
            const part = await reader.read();
            if (part.done) break;
            bytes += part.value.byteLength;
            if (bytes > 4 * 1024 * 1024) {
              void reader.cancel().catch(() => {});
              throw new Error("Upstream response exceeds the public data limit.");
            }
            chunks.push(part.value);
          }
          const body = new Uint8Array(bytes);
          let offset = 0;
          for (const chunk of chunks) {
            body.set(chunk, offset);
            offset += chunk.byteLength;
          }
          return new Response(body, {
            status: res.status,
            statusText: res.statusText,
            headers: res.headers,
          });
        })(),
        aborted,
      ]);
      unavailableUntil.delete(origin);
      return response;
    } catch (error) {
      const e = error as { code?: string; message?: string } | null;
      if (
        readOnly &&
        backoffMs > 0 &&
        !callerSignal?.aborted &&
        (/fetch failed|failed to fetch|network/i.test(e?.message ?? "") ||
          ["ETIMEDOUT", "ECONNREFUSED", "ECONNRESET", "ENOTFOUND", "EAI_AGAIN"].includes(
            e?.code ?? "",
          ))
      ) {
        if (unavailableUntil.size >= 8) unavailableUntil.clear();
        unavailableUntil.set(origin, Date.now() + backoffMs);
      }
      throw error;
    } finally {
      clearTimeout(timer);
      callerSignal?.removeEventListener("abort", onCallerAbort);
    }
  };
}
