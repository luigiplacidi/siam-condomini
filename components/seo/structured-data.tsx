import { type ReactNode } from "react";

type StructuredDataProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
  children?: ReactNode;
};

export function StructuredData({ data }: StructuredDataProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: json }} />;
}
