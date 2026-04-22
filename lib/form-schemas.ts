import { z } from "zod";

import type { ModalId } from "@/lib/site-content";

const emailField = z.string().min(1, "Email richiesta").email("Email non valida");
const fullNameField = z.string().min(2, "Inserisci nome e cognome");
const phoneOptional = z.string().trim().optional();
const phoneRequired = z.string().min(6, "Telefono richiesto");
const privacyConsent = z.boolean().refine((value) => value, {
  message: "Devi accettare il consenso privacy"
});

export const contactSchema = z.object({
  fullName: fullNameField,
  email: emailField,
  phone: phoneOptional,
  message: z.string().min(6, "Messaggio troppo breve"),
  privacyConsent
});

export const quoteSchema = z.object({
  fullName: fullNameField,
  email: emailField,
  phone: phoneRequired,
  buildingType: z.string().optional(),
  notes: z.string().min(6, "Inserisci qualche dettaglio"),
  privacyConsent
});

export const faultReportSchema = z.object({
  fullName: fullNameField,
  email: emailField,
  phone: phoneRequired,
  building: z.string().min(2, "Inserisci il condominio"),
  faultType: z.string().min(2, "Inserisci il tipo di guasto"),
  message: z.string().min(6, "Descrizione troppo breve"),
  privacyConsent
});

export const documentRequestSchema = z.object({
  fullName: fullNameField,
  email: emailField,
  building: z.string().min(2, "Inserisci il riferimento del condominio"),
  requestType: z.string().min(2, "Inserisci il documento richiesto"),
  message: z.string().optional(),
  privacyConsent
});

export const modalSchemaMap: Record<ModalId, z.ZodTypeAny> = {
  contactModal: contactSchema,
  quoteModal: quoteSchema,
  faultReportModal: faultReportSchema,
  documentRequestModal: documentRequestSchema
};

export const leadTypeMap: Record<ModalId, "CONTACT" | "QUOTE" | "FAULT" | "DOCUMENT"> = {
  contactModal: "CONTACT",
  quoteModal: "QUOTE",
  faultReportModal: "FAULT",
  documentRequestModal: "DOCUMENT"
};
