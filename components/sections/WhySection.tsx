import Image from "next/image";
import type { WhyData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";

/** Label, two-line title, text and three icon points on the left; photo with green corner accents and the navy experience badge on the right */
export const WhySection = ({ data }: { data?: WhyData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}>
      <div className="mx-auto flex max-w-[90rem] flex-col gap-14 px-4 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-[2.8rem]">
        <div data-reveal className="w-full shrink-0 lg:-mt-[0.4rem] lg:w-[42.2rem] lg:pl-[0.3rem]">
          <Eyebrow label={data.label} className={`${labelSize} font-extrabold text-[var(--color-primary)] lg:text-[1.55rem]`} lineClassName="w-16 lg:w-[6rem]" />
          <h2 className={`mt-3 font-heading font-black tracking-[-0.01em] ${titleSize} lg:mt-[1.1rem] lg:whitespace-nowrap lg:text-[2.95rem]`}>
            <span className="text-[var(--color-primary)]">{data.titleTop}</span> <br className="hidden sm:block" />
            <span className="text-[var(--color-green-dark)]">{data.titleAccent}</span>
          </h2>
          {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
          <p className="mt-5 font-heading text-[0.95rem] font-medium leading-[1.65] text-[var(--color-text-muted)] sm:text-[1rem] lg:mt-[2.3rem] lg:whitespace-pre-line lg:text-[1.1rem] lg:leading-[1.55]">
            {data.description}
          </p>

          <ul className="mt-8 flex flex-col gap-5 lg:mt-[2.3rem] lg:gap-[1.15rem]">
            {data.points.map((point) => (
              <li key={point.id} className="group flex items-center">
                <span className="grid h-[3.6rem] w-[4.4rem] shrink-0 place-items-center rounded-[0.75rem] bg-[var(--color-green-soft)] text-[var(--color-green)] transition-colors group-hover:bg-[var(--color-green)] group-hover:text-[var(--color-white)] lg:h-[4.4rem] lg:w-[5.5rem] lg:rounded-[0.7rem]">
                  <Icon name={point.icon} className="size-[1.9rem] lg:size-[2.75rem]" strokeWidth={2.2} />
                </span>
                <span aria-hidden="true" className="ml-4 mr-4 h-11 w-[0.125rem] shrink-0 bg-[var(--color-green)] lg:ml-[1.1rem] lg:mr-[1.25rem] lg:h-[3.4rem]" />
                <span>
                  <span className="block font-heading text-[1rem] font-extrabold leading-tight tracking-[-0.01em] text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-green-dark)] sm:text-[1.125rem] lg:text-[1.4rem]">
                    {point.title}
                  </span>
                  <span className="mt-1 block font-heading text-[0.85rem] font-medium text-[var(--color-text-muted)] sm:text-[0.95rem] lg:mt-[0.15rem] lg:text-[1.1rem]">{point.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="relative mx-auto mt-5 w-full shrink-0 sm:max-w-[34rem] lg:mx-0 lg:mr-[1.9rem] lg:mt-[1.2rem] lg:w-[37.2rem] lg:max-w-none">
          {/* green rounded block peeking out at the top-right corner */}
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-4 h-[40%] w-[45%] rounded-[1.6rem] bg-gradient-to-br from-[var(--color-green-accent-from)] to-[var(--color-green-accent-to)] lg:-right-[1.7rem] lg:-top-[1.2rem] lg:h-[12.3rem] lg:w-[14.4rem] lg:rounded-[2.2rem]"
          />
          <div className="relative aspect-[37.2/34.5] overflow-hidden rounded-[1.25rem] lg:rounded-[1.4rem]">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 42vw, (min-width: 640px) 34rem, 100vw" className="object-cover object-[45%_center]" />
          </div>

          {/* navy experience badge over the photo's bottom-left corner (below the photo on phones) */}
          <div className="relative ml-3 -mt-10 w-[16.5rem] sm:absolute sm:-left-6 sm:bottom-4 sm:ml-0 sm:mt-0 sm:w-[17rem] lg:-left-[4.6rem] lg:bottom-[0.95rem] lg:w-[18.4rem]">
            <span
              aria-hidden="true"
              className="absolute -bottom-[0.75rem] -left-[0.6rem] h-[45%] w-[60%] rounded-[1.2rem] bg-gradient-to-br from-[var(--color-green-accent-from)] to-[var(--color-green-accent-to)] lg:-bottom-[1.25rem] lg:-left-[0.75rem] lg:rounded-[1.6rem]"
            />
            <div className="relative rounded-[1rem] border-[0.1875rem] border-[var(--color-white)] bg-gradient-to-br from-[var(--color-badge-from)] to-[var(--color-badge-to)] p-5 text-[var(--color-white)] shadow-[0_0.875rem_1.875rem_var(--color-shadow-badge)] lg:rounded-[1.05rem] lg:pb-[1.5rem] lg:pl-[1.9rem] lg:pr-[1.4rem] lg:pt-[1.55rem]">
              <div className="flex items-center">
                <Icon name={data.badge.icon} className="size-[2.6rem] shrink-0 lg:size-[3.5rem]" strokeWidth={1.5} />
                <span aria-hidden="true" className="mx-3 w-[0.125rem] self-stretch bg-[var(--color-white-80)] lg:ml-[1.2rem] lg:mr-[1.05rem]" />
                <span>
                  <span className="block font-heading text-[2rem] font-extrabold leading-none lg:text-[2.75rem]">
                    <CountUp value={data.badge.value} suffix={data.badge.suffix} />
                  </span>
                  <span className="mt-1 block whitespace-nowrap font-heading text-[0.85rem] font-semibold lg:mt-[0.45rem] lg:text-[1rem]">{data.badge.label}</span>
                </span>
              </div>
              <p className="mt-3 font-heading text-[0.85rem] font-semibold leading-[1.42] text-[var(--color-white-95)] lg:mt-[1.05rem] lg:whitespace-pre-line lg:text-[1.05rem]">{data.badge.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
