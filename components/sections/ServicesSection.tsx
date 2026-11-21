import Image from "next/image";
import type { ServiceItem, ServicesData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Title with a green bar | thin divider | text and tag chips (desktop: one row next to the photo) */
const ServiceText = ({ item, imageLeft }: { item: ServiceItem; imageLeft: boolean }) => (
  <div className={`flex min-w-0 flex-1 flex-col lg:flex-row lg:items-center ${imageLeft ? "lg:pl-[1.95rem]" : "lg:pr-[3rem]"}`}>
    <div className={`shrink-0 ${imageLeft ? "lg:w-[16rem]" : "lg:w-[17.6rem]"}`}>
      <h3 className="whitespace-pre-line font-heading text-[1.375rem] font-black leading-[1.07] tracking-[-0.01em] text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-green-dark)] sm:text-[1.875rem] lg:text-[3.05rem]">
        {item.title}
      </h3>
      <span aria-hidden="true" className="mt-3 block h-[0.3125rem] w-20 rounded-full bg-[var(--color-green)] transition-[width] duration-300 group-hover:w-28 lg:mt-[1.15rem] lg:h-[0.4rem] lg:w-[6.5rem] lg:group-hover:w-[8.5rem]" />
    </div>

    <span aria-hidden="true" className={`my-[0.5rem] hidden w-px shrink-0 self-stretch bg-[var(--color-border)] lg:block ${imageLeft ? "ml-[1.3rem] mr-[3.1rem]" : "ml-[2rem] mr-[2.35rem]"}`} />

    <div className="mt-5 min-w-0 flex-1 lg:mt-0">
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="font-heading text-[0.95rem] font-medium leading-[1.55] text-[var(--color-text)] sm:text-[1rem] lg:whitespace-pre-line lg:text-[1.2rem] lg:leading-[1.22]">{item.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2 lg:mt-[0.95rem] lg:gap-x-[0.7rem] lg:gap-y-[0.55rem]">
        {item.tags.map((tag) => (
          <li
            key={tag.id}
            className="rounded-full border-[0.09375rem] border-[var(--color-green-chip-border)] bg-[var(--color-green-pale)] px-3.5 py-2 font-heading text-[0.8rem] font-semibold leading-none tracking-[-0.02em] text-[var(--color-primary-strong)] transition-colors hover:border-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-[var(--color-white)] sm:text-[0.875rem] lg:px-[1.05rem] lg:py-[0.45rem] lg:text-[0.96rem]"
          >
            {tag.text}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

/** Centred heading, then one row per service with the photo on alternating sides and a thin line between rows */
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal className="text-center">
          <Eyebrow
            label={data.label}
            lines="both"
            className={`${labelSize} font-black uppercase leading-tight text-[var(--color-primary)] lg:text-[2.2rem]`}
            lineClassName="w-10 sm:w-16 lg:w-[6rem]"
          />
          <h2 className={`mt-2 font-heading font-black tracking-[-0.01em] text-[var(--color-primary)] ${titleSize} lg:mt-[0.75rem] lg:text-[3.43rem]`}>
            {data.titleTop} <span className="text-[var(--color-green-bright)]">{data.titleAccent}</span> {data.titleBottom}
          </h2>
        </div>

        <div className="mt-10 lg:mt-[4.6rem]">
          {data.items.map((item, index) => {
            const imageLeft = index % 2 === 1;
            return (
              <article
                key={item.id}
                data-reveal
                className={`group flex flex-col gap-6 border-t border-[var(--color-divider)] py-8 first:border-t-0 first:pt-0 last:pb-0 md:items-center md:gap-8 md:py-10 lg:gap-0 lg:py-[2.65rem] ${
                  imageLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="relative aspect-[1.27] w-full shrink-0 overflow-hidden rounded-[1.25rem] shadow-[0_0.625rem_1.875rem_var(--color-shadow-soft)] md:w-[45%] lg:w-[32rem] lg:rounded-[1.9rem]">
                  <Image src={item.image} alt={item.imageAlt} fill quality={90} sizes="(min-width: 1024px) 36vw, (min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <ServiceText item={item} imageLeft={imageLeft} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
