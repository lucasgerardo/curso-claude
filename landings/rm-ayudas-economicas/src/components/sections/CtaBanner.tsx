import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { ctaBanner } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type CtaBannerProps = { id: string } & typeof ctaBanner;

export function CtaBanner({ id, title, subtitle, cta }: CtaBannerProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`} tone="brand">
      <SectionHeader id={`${id}-title`} title={title} subtitle={subtitle} inverse />
      <div className="mt-10 flex justify-center">
        <Button href={cta.href} size="lg" variant="inverse">
          {cta.label}
          <Icon name="arrow" className="size-5" />
        </Button>
      </div>
    </Section>
  );
}
