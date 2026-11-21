import { Icon } from "@/components/ui/Icon";

/**
 * Size of every section title on phones and tablets, so all titles match (desktop sizes follow the design per section).
 * Phones: shrinks with the screen width so even the longest title stays within two lines; tablets: 2.4rem.
 */
export const titleSize = "text-[length:min(1.75rem,calc((100vw-2rem)/15))] leading-[1.2] sm:text-[2.4rem]";

/** Size of every section label ("About Us", "Our Services"…) on phones and tablets */
export const labelSize = "text-lg sm:text-2xl";

type EyebrowProps = {
  label: string;
  /** optional icon before the label (Contact Us: broom) */
  icon?: string;
  /** "after": one line after the label (left-aligned headings); "both": a line on each side (centred headings) */
  lines?: "after" | "both";
  /** text colour, size and weight of this section's label */
  className?: string;
  /** length of the green lines */
  lineClassName?: string;
};

/** Label above a section title, with short green lines beside it */
export const Eyebrow = ({ label, icon, lines = "after", className = "", lineClassName = "w-10 sm:w-14 lg:w-[5rem]" }: EyebrowProps) => {
  const line = <span aria-hidden="true" className={`h-[0.125rem] shrink-0 bg-[var(--color-green)] lg:h-[0.1875rem] ${lineClassName}`} />;

  return (
    <p className={`flex items-center gap-3 font-heading lg:gap-[1.25rem] ${lines === "both" ? "justify-center" : ""} ${className}`}>
      {lines === "both" && line}
      <span className="flex items-center gap-2 lg:gap-[0.6rem]">
        {icon && <Icon name={icon} className="-mt-[0.2em] size-[1.4em] shrink-0 text-[var(--color-green)]" />}
        {label}
      </span>
      {line}
    </p>
  );
};
