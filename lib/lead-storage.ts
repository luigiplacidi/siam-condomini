import { put } from "@vercel/blob";
import { randomUUID } from "crypto";

import { logLeadError, logLeadInfo, logLeadWarn } from "@/lib/lead-logger";

type LeadStoragePayload = {
  id: string;
  modalId: string;
  type: string;
  data: Record<string, unknown>;
  email: {
    internalSent: boolean;
    confirmationSent: boolean;
    internalError?: string;
    confirmationError?: string;
  };
  createdAt: string;
};

type LeadStorageResult = {
  saved: boolean;
  url?: string;
  pathname?: string;
  error?: string;
};

export function createLeadId() {
  return `lead-${new Date().toISOString().replace(/[:.]/g, "-")}-${randomUUID()}`;
}

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function getLeadPath(leadId: string, createdAt: string) {
  const date = new Date(createdAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `leads/${year}/${month}/${day}/${leadId}.json`;
}

export async function saveLeadToBlob(payload: LeadStoragePayload): Promise<LeadStorageResult> {
  if (!isBlobConfigured()) {
    logLeadWarn("blob_not_configured", {
      leadId: payload.id,
      modalId: payload.modalId,
      hasBlobToken: false
    });

    return {
      saved: false,
      error: "BLOB_READ_WRITE_TOKEN missing"
    };
  }

  const pathname = getLeadPath(payload.id, payload.createdAt);

  try {
    const result = await put(pathname, JSON.stringify(payload, null, 2), {
      access: "private",
      contentType: "application/json"
    });

    logLeadInfo("blob_save_success", {
      leadId: payload.id,
      modalId: payload.modalId,
      pathname: result.pathname,
      url: result.url
    });

    return {
      saved: true,
      pathname: result.pathname,
      url: result.url
    };
  } catch (error) {
    logLeadError("blob_save_failed", error, {
      leadId: payload.id,
      modalId: payload.modalId,
      pathname,
      hasBlobToken: true
    });

    return {
      saved: false,
      pathname,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}
