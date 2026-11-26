import type { Metadata } from "next";
import type { LegalPageContent } from "@/content/landing";

/** Metadata de una página legal. Mientras no tenga contenido, no se indexa. */
export function legalMetadata(page: LegalPageContent, path: string): Metadata {
  const empty = page.sections.length === 0;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    robots: empty ? { index: false, follow: true } : { index: true, follow: true },
  };
}
