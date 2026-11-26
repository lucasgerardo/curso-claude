import { cn } from "@/lib/cn";
import { Container } from "./Container";

const tones = {
  default: "bg-white",
  muted: "bg-zinc-50",
  brand: "bg-brand-900 text-white",
} as const;

type SectionProps = React.ComponentProps<"section"> & {
  labelledBy: string;
  tone?: keyof typeof tones;
};

export function Section({ labelledBy, tone = "default", className, children, ...props }: SectionProps) {
  return (
    <section aria-labelledby={labelledBy} className={cn("py-16 sm:py-24", tones[tone], className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
