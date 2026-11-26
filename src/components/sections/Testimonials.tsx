import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import type { Testimonial } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type TestimonialsProps = { id: string; title: string; items: Testimonial[] };

export function Testimonials({ id, title, items }: TestimonialsProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`} tone="muted">
      <SectionHeader id={`${id}-title`} title={title} />
      <ul className="mt-14 grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <li key={index}>
            <Card className="h-full">
              <figure className="flex h-full flex-col">
                <blockquote className="flex-1 text-base text-pretty text-zinc-800">
                  <p>“{item.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold text-zinc-900">{item.name}</span>
                  <span className="text-zinc-600"> · {item.detail}</span>
                </figcaption>
              </figure>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
