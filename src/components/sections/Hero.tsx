import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import type { hero as heroContent } from "@/content/landing";

type HeroProps = typeof heroContent;

export function Hero({ badge, title, subtitle, primaryCta, secondaryCta, highlights }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-[32rem] bg-[radial-gradient(60%_60%_at_50%_0%,var(--color-brand-50),transparent)]"
      />
      <Container className="relative py-20 text-center sm:py-28 lg:py-32">
        <Badge>
          <Icon name="bolt" className="size-4" />
          {badge}
        </Badge>
        <Heading as="h1" id="hero-title" size="xl" className="mx-auto mt-6 max-w-3xl">
          {title}
        </Heading>
        <Text variant="lead" className="mx-auto mt-6 max-w-2xl">
          {subtitle}
        </Text>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href={primaryCta.href} size="lg" className="w-full sm:w-auto">
            {primaryCta.label}
            <Icon name="arrow" className="size-5" />
          </Button>
          <Button href={secondaryCta.href} size="lg" variant="secondary" className="w-full sm:w-auto">
            {secondaryCta.label}
          </Button>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-3 divide-x divide-zinc-200 rounded-card bg-white/70 py-6 ring-1 ring-zinc-200">
          {highlights.map((item) => (
            <div key={item.label} className="flex flex-col-reverse gap-1 px-2">
              <dt className="text-xs text-zinc-600 sm:text-sm">{item.label}</dt>
              <dd className="text-lg font-semibold tracking-tight tabular-nums sm:text-2xl">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
