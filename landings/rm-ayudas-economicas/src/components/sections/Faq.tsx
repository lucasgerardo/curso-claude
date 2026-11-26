import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { FaqItem } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type FaqProps = { id: string; title: string; items: FaqItem[] };

/** FAQ con <details>/<summary> nativos: accesible por teclado y sin JavaScript. */
export function Faq({ id, title, items }: FaqProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHeader id={`${id}-title`} title={title} />
      <div className="mx-auto mt-12 max-w-3xl divide-y divide-zinc-200 border-y border-zinc-200">
        {items.map((item) => (
          <details key={item.question} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-medium text-zinc-900 [&::-webkit-details-marker]:hidden">
              {item.question}
              <Icon name="chevron" className="size-5 text-zinc-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="pb-5 text-base text-pretty text-zinc-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
