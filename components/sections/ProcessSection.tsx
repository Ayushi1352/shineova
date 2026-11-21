import Image from "next/image";
import type { ProcessData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { BrushStroke, DottedArrowArt } from "@/components/ui/LineArt";
import { sectionSpace } from "@/components/ui/sectionSpace";

/** Centred heading, then four numbered steps: round photo over a white card with a green bottom edge */
export const ProcessSection = ({ data }: { data?: ProcessData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`scroll-mt-[4.5rem] bg-[var(--color-bg-main)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal className="text-center">
          <Eyebrow label={data.label} lines="both" className={`${labelSize} font-extrabold text-[var(--color-primary)] lg:text-[1.9rem]`} lineClassName="w-10 sm:w-14 lg:w-[4rem]" />
          <h2 className={`mt-2 font-heading font-black tracking-[-0.01em] text-[var(--color-primary)] ${titleSize} lg:mt-[0.55rem] lg:text-[2.6rem]`}>
            {data.titleTop}{" "}
            <span className="relative inline-block text-[var(--color-green-dark)]">
              {data.titleAccent}
              <BrushStroke className="left-[16%] top-[92%] h-[0.32em] w-[76%]" />
            </span>
          </h2>
          <p className="mt-4 font-heading text-[0.95rem] font-medium text-[var(--color-text-muted)] sm:text-[1.125rem] lg:mt-[1.15rem] lg:text-[1.27rem]">{data.description}</p>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-[1rem] lg:grid-cols-4 lg:gap-x-[2.7rem]">
          {data.steps.map((step, index) => (
            <li key={step.id} data-reveal data-reveal-delay={index * 100} className="group relative flex flex-col items-center">
              {index < data.steps.length - 1 && (
                <DottedArrowArt className="absolute -right-[4.1rem] top-[0.9rem] z-10 hidden w-[5.6rem] text-[var(--color-green)] lg:block" />
              )}

              <div className="relative z-10 size-48 rounded-full bg-[radial-gradient(circle,var(--color-white)_60%,var(--color-green-ring-soft)_100%)] p-[0.6rem] shadow-[0_0.375rem_1.125rem_var(--color-shadow-green)] transition-transform duration-500 group-hover:-translate-y-1.5 lg:size-[14rem] lg:p-[0.65rem]">
                <div className="relative size-full overflow-hidden rounded-full border-4 border-[var(--color-white)]">
                  <Image src={step.image} alt={step.imageAlt} fill sizes="(min-width: 1024px) 16vw, 12rem" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <span className="absolute left-[0.2rem] top-[0.9rem] grid size-12 place-items-center rounded-full border-[0.1875rem] border-[var(--color-white)] bg-[var(--color-green-dark)] font-heading text-lg font-extrabold text-[var(--color-white)] shadow-md lg:left-[0.1rem] lg:top-[0.95rem] lg:size-[3.6rem] lg:text-[1.55rem]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="-mt-[2.2rem] w-full max-w-[22rem] rounded-[1.4rem] border-b-[0.3125rem] border-[var(--color-green-ring)] bg-[var(--color-white)] px-5 pb-5 pt-[3.1rem] text-center shadow-[0_0.5rem_1.5rem_var(--color-shadow-card)] transition-[border-color,box-shadow] duration-300 group-hover:border-[var(--color-green)] lg:-mt-[2.35rem] lg:max-w-none lg:px-[0.6rem] lg:pb-[1.5rem] lg:pt-[2.9rem]">
                <h3 className="font-heading text-lg font-extrabold leading-tight tracking-[-0.04em] text-[var(--color-primary)] transition-colors group-hover:text-[var(--color-green-dark)] lg:whitespace-nowrap lg:text-[1.5rem]">
                  {step.title}
                </h3>
                {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
                <p className="mx-auto mt-2 font-heading text-[0.9rem] font-medium leading-[1.4] text-[var(--color-text)] lg:mt-[0.75rem] lg:whitespace-pre-line lg:text-[1.08rem] lg:leading-[1.38]">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
