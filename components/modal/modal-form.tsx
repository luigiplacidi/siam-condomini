"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { modalSchemaMap } from "@/lib/form-schemas";
import { type ModalDefinition } from "@/lib/site-content";
import { Button } from "@/components/ui/button";

type FormValues = Record<string, string | boolean | undefined>;

type ModalFormProps = {
  modal: ModalDefinition;
  onSuccess: () => void;
};

function createDefaults(modal: ModalDefinition): FormValues {
  return modal.fields.reduce<FormValues>((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});
}

export function ModalForm({ modal, onSuccess }: ModalFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");

  const schema = useMemo(() => modalSchemaMap[modal.id], [modal.id]);

  const form = useForm({
    resolver: zodResolver(schema as never),
    defaultValues: createDefaults(modal)
  });

  useEffect(() => {
    form.reset(createDefaults(modal));
    setSubmitState("idle");
  }, [form, modal]);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitState("idle");

    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modalId: modal.id, data: values })
    });

    if (!response.ok) {
      setSubmitState("error");
      return;
    }

    setSubmitState("success");
    setTimeout(() => {
      onSuccess();
    }, 700);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {modal.fields.map((field) => {
        const error = form.formState.errors[field.name]?.message;

        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-start gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-border"
                {...form.register(field.name)}
              />
              <span>{field.label}</span>
              {error ? <span className="text-danger">{String(error)}</span> : null}
            </label>
          );
        }

        if (field.type === "textarea") {
          return (
            <label key={field.name} className="grid gap-2">
              <span className="text-sm font-medium text-foreground">{field.label}</span>
              <textarea
                rows={4}
                className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                {...form.register(field.name)}
              />
              {error ? <span className="text-xs text-danger">{String(error)}</span> : null}
            </label>
          );
        }

        return (
          <label key={field.name} className="grid gap-2">
            <span className="text-sm font-medium text-foreground">{field.label}</span>
            <input
              type={field.type}
              className="h-11 rounded-xl border border-border bg-white px-3 text-sm text-foreground focus:border-primary focus:outline-none"
              {...form.register(field.name)}
            />
            {error ? <span className="text-xs text-danger">{String(error)}</span> : null}
          </label>
        );
      })}

      {submitState === "success" ? (
        <p className="text-sm font-medium text-accent">Richiesta inviata con successo.</p>
      ) : null}

      {submitState === "error" ? (
        <p className="text-sm font-medium text-danger">Invio non riuscito. Riprova tra poco.</p>
      ) : null}

      <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Invio in corso...
          </span>
        ) : (
          modal.submitLabel
        )}
      </Button>
    </form>
  );
}
