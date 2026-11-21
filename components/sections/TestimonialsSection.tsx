import type { TestimonialsData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Centred heading, then one review at a time with the client's photo */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal className="text-center">
          <Eyebrow label={data.label} lines="both" className={`${labelSize} font-semibold text-[var(--color-primary-dark)] lg:text-[2.15rem]`} lineClassName="w-10 sm:w-16 lg:w-[5.9rem]" />
          <h2 className={`mt-2 font-heading font-black tracking-[-0.005em] text-[var(--color-primary-dark)] ${titleSize} lg:mt-[0.6rem] lg:text-[3.25rem]`}>
            {data.titleTop} <span className="text-[var(--color-green-bright)]">{data.titleAccent}</span>
          </h2>
          <p className="mt-3 font-heading text-[0.95rem] font-medium text-[var(--color-text-muted)] sm:text-[1.125rem] lg:mt-[0.4rem] lg:text-[1.53rem]">{data.description}</p>
        </div>

        <div data-reveal className="mx-auto mt-10 max-w-[79.4rem] lg:mt-[2.85rem]">
          <TestimonialSlider data={data} />
        </div>
      </div>
    </section>
  );
};
