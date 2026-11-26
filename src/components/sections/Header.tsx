import Link from "next/link";
import { MobileNav } from "@/components/client/MobileNav";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { NavLink } from "@/content/landing";

type HeaderProps = { brand: string; links: NavLink[]; cta: NavLink };

export function Header({ brand, links, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/90 backdrop-blur supports-backdrop-filter:bg-white/75">
      <Container className="relative flex h-16 items-center justify-between gap-6">
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

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm whitespace-nowrap text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href={cta.href}>{cta.label}</Button>
        </div>

        <MobileNav links={links} cta={cta} />
      </Container>
    </header>
  );
}
