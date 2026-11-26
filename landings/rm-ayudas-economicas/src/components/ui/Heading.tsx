import { cn } from "@/lib/cn";

const sizes = {
  xl: "text-4xl sm:text-5xl lg:text-6xl",
  lg: "text-3xl sm:text-4xl",
  md: "text-xl",
  sm: "text-lg",
} as const;

type HeadingProps = React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3";
  size?: keyof typeof sizes;
};

export function Heading({ as: Tag = "h2", size = "lg", className, ...props }: HeadingProps) {
  return <Tag className={cn("font-semibold tracking-tight text-balance", sizes[size], className)} {...props} />;
}
