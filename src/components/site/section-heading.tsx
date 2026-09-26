import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Section title in two styles from the design:
 *  - "kicker": ● ABOUT ME  + big title
 *  - "line":   What I Do ——  + big title
 */
export function SectionHeading({
  label,
  title,
  variant = "line",
  center = false,
  className,
  children,
}: {
  label: string;
  title: React.ReactNode;
  variant?: "line" | "kicker";
  center?: boolean;
  className?: string;
  /** Right-side action (button/link) shown next to the title on wide screens */
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 flex flex-col gap-6 md:mb-14",
        center ? "items-center text-center" : Boolean(children) && "md:flex-row md:items-end md:justify-between",
        className
      )}
    >
      <div className={cn(center && "flex flex-col items-center")}>
        <p className={variant === "kicker" ? "kicker" : "label-line"}>{label}</p>
        <h2 className="h-section mt-4 max-w-[640px]">{title}</h2>
      </div>
      {children && <div className="shrink-0">{children}</div>}
    </Reveal>
  );
}
