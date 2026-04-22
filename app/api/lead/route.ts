import { NextResponse } from "next/server";

import { leadTypeMap, modalSchemaMap } from "@/lib/form-schemas";
import { prisma } from "@/lib/prisma";
import type { ModalId } from "@/lib/site-content";

const modalIdSchema = ["contactModal", "quoteModal", "faultReportModal", "documentRequestModal"] as const;

function isModalId(value: string): value is ModalId {
  return modalIdSchema.includes(value as ModalId);
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      modalId?: string;
      data?: Record<string, unknown>;
    };

    if (!payload.modalId || !payload.data || !isModalId(payload.modalId)) {
      return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
    }

    const schema = modalSchemaMap[payload.modalId];
    const parsed = schema.safeParse(payload.data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Controlla i campi richiesti",
          issues: parsed.error.flatten()
        },
        { status: 400 }
      );
    }

    const data = parsed.data as Record<string, unknown>;

    await prisma.leadRequest.create({
      data: {
        type: leadTypeMap[payload.modalId],
        fullName: String(data.fullName ?? ""),
        email: String(data.email ?? ""),
        phone: typeof data.phone === "string" ? data.phone : null,
        buildingType: typeof data.buildingType === "string" ? data.buildingType : null,
        building: typeof data.building === "string" ? data.building : null,
        faultType: typeof data.faultType === "string" ? data.faultType : null,
        documentType: typeof data.requestType === "string" ? data.requestType : null,
        message:
          typeof data.message === "string"
            ? data.message
            : typeof data.notes === "string"
              ? data.notes
              : null,
        privacyConsent: Boolean(data.privacyConsent)
      }
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        error: "Invio non riuscito. Riprova tra qualche minuto oppure contattaci via telefono."
      },
      { status: 500 }
    );
  }
}
