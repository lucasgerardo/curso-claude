import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import type { Step } from "@/content/landing";
import { SectionHeader } from "./SectionHeader";

type HowItWorksProps = { id: string; eyebrow: string; title: string; steps: Step[] };

export function HowItWorks({ id, eyebrow, title, steps }: HowItWorksProps) {
  return (
    <Section id={id} labelledBy={`${id}-title`}>
      <SectionHeader id={`${id}-title`} eyebrow={eyebrow} title={title} />
      <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative text-center md:text-left">
            <span
              aria-hidden="true"
              className="mx-auto grid size-11 place-items-center rounded-full bg-brand-600 text-base font-semibold text-white md:mx-0"
            >
              {index + 1}
            </span>
            <Heading as="h3" size="sm" className="mt-4">
              <span className="sr-only">Paso {index + 1}: </span>
              {step.title}
            </Heading>
            <Text className="mx-auto mt-2 max-w-xs md:mx-0">{step.description}</Text>
          </li>
        ))}
      </ol>
    </Section>
  );
}
