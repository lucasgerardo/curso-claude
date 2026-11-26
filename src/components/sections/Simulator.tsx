import { LoanSimulator } from "@/components/client/LoanSimulator";
import { Section } from "@/components/ui/Section";
import type { simulator as simulatorContent } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type SimulatorProps = { id: string; whatsapp: string } & typeof simulatorContent;

export function Simulator({ id, title, subtitle, whatsapp, ...config }: SimulatorProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`} tone="muted">
      <SectionHeader id={`${id}-title`} title={title} subtitle={subtitle} />
      <div className="mx-auto mt-12 max-w-5xl">
        <LoanSimulator whatsapp={whatsapp} {...config} />
      </div>
    </Section>
  );
}
