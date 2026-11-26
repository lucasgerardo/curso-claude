import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Feature } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type FeaturesProps = { id: string; eyebrow: string; title: string; subtitle: string; items: Feature[] };

export function Features({ id, eyebrow, title, subtitle, items }: FeaturesProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`} tone="muted">
      <SectionHeader id={`${id}-title`} eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title}>
            <div className="grid size-11 place-items-center rounded-xl bg-white text-brand-600 ring-1 ring-zinc-200">
              <Icon name={item.icon} />
            </div>
            <Heading as="h3" size="sm" className="mt-4">
              {item.title}
            </Heading>
            <Text className="mt-2">{item.description}</Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
