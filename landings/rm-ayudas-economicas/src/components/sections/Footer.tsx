import { Container } from "@/components/ui/Container";
import type { NavLink } from "@/content/landing";

type FooterProps = { brand: string; legalName: string; year: number; email: string; legal: string; links: NavLink[] };

export function Footer({ brand, legalName, year, email, legal, links }: FooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">{brand}</p>
            <p className="mt-2 text-sm text-zinc-600">
              <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-zinc-900">
                {email}
              </a>
            </p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex flex-col gap-3 text-sm sm:flex-row sm:gap-6">
              {links.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline"
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.label}
                      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-zinc-600">{legal}</p>
        <p className="mt-4 text-xs text-zinc-600">
          © {year} {legalName}. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}
