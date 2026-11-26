"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import type { NavLink } from "@/content/landing";

type MobileNavProps = { links: NavLink[]; cta: NavLink };

export function MobileNav({ links, cta }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-zinc-700 hover:bg-zinc-100"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-b border-zinc-200 bg-white shadow-sm"
      >
        <nav aria-label="Principal (móvil)" className="px-4 py-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-11 items-center rounded-lg px-3 text-base text-zinc-800 hover:bg-zinc-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={cta.href} onClick={close} className="mt-4 w-full">
            {cta.label}
          </Button>
        </nav>
      </div>
    </div>
  );
}
