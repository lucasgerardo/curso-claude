import { Card } from "@/components/ui/Card";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type RequirementsProps = { id: string; title: string; subtitle: string; items: string[] };

export function Requirements({ id, title, subtitle, items }: RequirementsProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Heading id={`${id}-title`}>{title}</Heading>
          <Text variant="lead" className="mt-4">
            {subtitle}
          </Text>
        </div>
        <Card>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item} className="flex gap-3">
                <Icon name="check" className="mt-0.5 size-5 text-brand-600" />
                <Text className="text-zinc-800">{item}</Text>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
