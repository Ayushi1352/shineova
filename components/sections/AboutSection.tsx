import { Fragment } from "react";
import type { AboutData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

const featureTones: Record<string, string> = {
  green: "from-[var(--color-green-halo-from)] to-[var(--color-green-halo-to)]",
  blue: "from-[var(--color-blue-halo-from)] to-[var(--color-blue-halo-to)]",
};

/** Centred label, two-line title and text, then four round icons with their names in a line-divided row */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 text-center sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal>
          <Eyebrow label={data.label} lines="both" className={`${labelSize} font-extrabold leading-tight text-[var(--color-green)] lg:text-[2.3rem]`} />
          <h2 className={`mt-2 font-heading font-black tracking-[-0.01em] text-[var(--color-primary)] ${titleSize} lg:mt-[0.35rem] lg:text-[3.4rem] lg:leading-[1.12]`}>
            {data.titleTop} <br className="hidden sm:block" />
            {data.titleBottom}
          </h2>
          {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
          <p className="mx-auto mt-5 max-w-[44rem] text-[0.95rem] leading-[1.65] text-[var(--color-text-muted)] sm:text-[1rem] lg:mt-[1.55rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.22rem] lg:leading-[1.5]">
            {data.description}
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-y-8 sm:grid-cols-4 lg:mt-[2rem] lg:flex lg:items-center lg:justify-center">
          {data.features.map((feature, index) => (
            <Fragment key={feature.id}>
              {index > 0 && <li aria-hidden="true" className="hidden h-[5rem] w-px bg-[var(--color-border)] lg:block" />}
              <li data-reveal data-reveal-delay={index * 100} className="group flex flex-col items-center lg:w-[17.8rem]">
                <span
                  className={`grid size-14 place-items-center rounded-full bg-gradient-to-br text-[var(--color-green)] transition-colors group-hover:from-[var(--color-green)] group-hover:to-[var(--color-green)] group-hover:text-[var(--color-white)] sm:size-16 lg:size-[4.7rem] ${
                    featureTones[feature.tone] ?? featureTones.green
                  }`}
                >
                  <Icon name={feature.icon} className="size-6 sm:size-[1.8rem] lg:size-[2.75rem]" strokeWidth={2.4} />
                </span>
                <span className="mt-2.5 font-heading text-sm font-extrabold text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-green)] sm:text-[1rem] lg:mt-[0.55rem] lg:text-[1.3rem]">
                  {feature.title}
                </span>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
