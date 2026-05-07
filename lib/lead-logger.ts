type LeadLogContext = Record<string, unknown>;

function serializeError(error: unknown) {
  if (!(error instanceof Error)) {
    return { message: String(error) };
  }

  const details = error as Error & {
    code?: string;
    command?: string;
    response?: string;
    responseCode?: number;
  };

  return {
    name: error.name,
    message: error.message,
    code: details.code,
    command: details.command,
    responseCode: details.responseCode,
    response: details.response
  };
}

function log(level: "info" | "warn" | "error", event: string, context: LeadLogContext = {}) {
  const payload = {
    scope: "lead-api",
    event,
    ...context
  };

  if (level === "error") {
    console.error(JSON.stringify(payload));
    return;
  }

  if (level === "warn") {
    console.warn(JSON.stringify(payload));
    return;
  }

  console.info(JSON.stringify(payload));
}

export function logLeadInfo(event: string, context?: LeadLogContext) {
  log("info", event, context);
}

export function logLeadWarn(event: string, context?: LeadLogContext) {
  log("warn", event, context);
}

export function logLeadError(event: string, error: unknown, context: LeadLogContext = {}) {
  log("error", event, {
    ...context,
    error: serializeError(error)
  });
}
