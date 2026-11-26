import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import type { LegalPageContent } from "@/content/landing";

type LegalPageProps = LegalPageContent & { brand: string };

/** Plantilla para páginas legales: header mínimo, contenido en prosa y aviso si está vacía. */
export function LegalPage({ brand, title, updatedAt, sections }: LegalPageProps) {
  const isEmpty = sections.length === 0;

  return (
    <>
      <header className="border-b border-zinc-200 bg-white">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 rounded-md text-lg font-bold tracking-tight">
            <span
              aria-hidden="true"
              className="grid size-8 place-items-center rounded-lg bg-brand-600 text-sm font-bold text-white"
            >
              {brand}
            </span>
            <span>
              {brand}
              <span className="sr-only">, inicio</span>
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            <Icon name="arrow" className="size-4 rotate-180" />
            Volver al inicio
          </Link>
        </Container>
      </header>

      <main id="main" tabIndex={-1} className="outline-none">
        <Container className="max-w-3xl py-16 sm:py-24">
          <Heading as="h1" size="lg" className="text-zinc-900">
            {title}
          </Heading>
          {updatedAt && <Text variant="muted" className="mt-3">Última actualización: {updatedAt}</Text>}

          {isEmpty ? (
            <div className="mt-10 rounded-card bg-zinc-50 p-6 ring-1 ring-zinc-200 sm:p-8">
              <Text>Estamos preparando el contenido de esta página. Volvé a consultarla pronto.</Text>
            </div>
          ) : (
            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <section key={section.title}>
                  <Heading size="md" className="text-zinc-900">
                    {section.title}
                  </Heading>
                  <div className="mt-3 space-y-4">
                    {section.body.map((paragraph, index) => (
                      <Text key={index}>{paragraph}</Text>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
