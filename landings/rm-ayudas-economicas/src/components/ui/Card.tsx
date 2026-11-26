import { cn } from "@/lib/cn";

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-card bg-white p-6 ring-1 ring-zinc-200 sm:p-8", className)} {...props} />;
}
