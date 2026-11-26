import { cn } from "@/lib/cn";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  inverse?: boolean;
  className?: string;
};

/** Encabezado común de sección: eyebrow + h2 + subtítulo, centrado. */
export function SectionHeader({ id, title, subtitle, eyebrow, inverse, className }: SectionHeaderProps) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow && (
        <p className={cn("text-sm font-semibold", inverse ? "text-brand-100" : "text-brand-700")}>{eyebrow}</p>
      )}
      <Heading id={id} className={cn("mt-2", inverse ? "text-white" : "text-zinc-900")}>
        {title}
      </Heading>
      {subtitle && (
        <Text variant="lead" className={cn("mt-4", inverse && "text-brand-100")}>
          {subtitle}
        </Text>
      )}
    </div>
  );
}
