import { cn } from "@/lib/cn";

/** Set de iconos de línea en rejilla 24×24, trazo 1.75. Decorativos por defecto. */
const paths = {
  bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8Z",
  shield: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Zm-3 9 2 2 4-4",
  phone: "M8 2h8a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Zm3 17h2",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  calendar: "M4 6h16v14H4V6Zm0 4h16M8 3v4m8-4v4",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
  check: "m5 12 4 4 10-10",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  chevron: "m6 9 6 6 6-6",
  chat: "M4 5h16v11H9l-5 4V5Z",
} as const;

export type IconName = keyof typeof paths;

type IconProps = Omit<React.ComponentProps<"svg">, "children"> & { name: IconName; label?: string };

export function Icon({ name, label, className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6 shrink-0", className)}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
