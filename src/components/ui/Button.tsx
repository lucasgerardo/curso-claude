import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50",
  inverse: "bg-white text-brand-900 hover:bg-brand-50",
  ghost: "text-zinc-700 hover:bg-zinc-100",
} as const;

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};
type AsLink = Common & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">;
type AsButton = Common & { href?: undefined } & Omit<React.ComponentProps<"button">, "className">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  if (rest.href !== undefined) {
    return <Link {...(rest as AsLink)} className={classes} />;
  }
  return <button type="button" {...(rest as AsButton)} className={classes} />;
}
