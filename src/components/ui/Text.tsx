import { cn } from "@/lib/cn";

const variants = {
  lead: "text-lg sm:text-xl text-zinc-600",
  body: "text-base text-zinc-700",
  muted: "text-sm text-zinc-600",
} as const;

type TextProps = React.ComponentProps<"p"> & { variant?: keyof typeof variants };

export function Text({ variant = "body", className, ...props }: TextProps) {
  return <p className={cn("text-pretty", variants[variant], className)} {...props} />;
}
