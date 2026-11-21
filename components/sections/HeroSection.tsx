import { Fragment } from "react";
import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { BrushStroke, BubblesArt, SparklesArt } from "@/components/ui/LineArt";
import { sectionSpaceBottom } from "@/components/ui/sectionSpace";
import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";

const statTones: Record<string, string> = {
  green: "from-[var(--color-green-tint-from)] to-[var(--color-green-tint-to)] text-[var(--color-green)]",
  blue: "from-[var(--color-blue-tint-from)] to-[var(--color-blue-tint-to)] text-[var(--color-blue-icon)]",
};

/** Label pill, two-line title, one line of text, the photo in a rounded trapezoid frame, then the four numbers */
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;
  // the green brush stroke sits under one part of the second title line ("Fresh &")
  const [before, after = ""] = data.titleAccent.split(data.titleUnderline);
  const underlined = data.titleAccent.includes(data.titleUnderline);

  return (
    <section
      id={data.id}
      className="relative bg-gradient-to-b from-[var(--color-bg-hero-top)] to-[var(--color-bg-hero-bottom)] pt-[7rem] sm:pt-[8rem] lg:pt-[10.1rem]"
    >
      {/* clip path of the photo frame: a trapezoid with rounded corners, narrower at the top */}
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <clipPath id="heroFrameClip" clipPathUnits="objectBoundingBox">
            <path d="M0.115,0 H0.885 Q0.935,0 0.944,0.085 L0.997,0.86 Q1,1 0.945,1 H0.055 Q0,1 0.003,0.86 L0.056,0.085 Q0.065,0 0.115,0 Z" />
          </clipPath>
        </defs>
      </svg>

      <SparklesArt className="absolute left-[3%] top-[13.4rem] hidden w-[7.4rem] text-[var(--color-sparkle)] lg:block" />
      <SparklesArt className="absolute left-[13%] top-[36.7rem] hidden w-[4.6rem] text-[var(--color-sparkle)] lg:block" />
      <BubblesArt className="absolute right-[4.5%] top-[29.7rem] hidden w-[6.9rem] text-[var(--color-sparkle)] lg:block" />

      <div className="relative mx-auto max-w-[90rem] px-4 text-center sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal>
          <p className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-[0.9rem]">
            <span aria-hidden="true" className="hidden h-[0.125rem] w-8 rounded-full bg-[var(--color-green)] sm:block lg:h-[0.1875rem] lg:w-[3.7rem]" />
            <span className="inline-flex h-10 items-center gap-2 rounded-full border-2 border-[var(--color-green-line)] bg-[var(--color-white-40)] px-4 sm:h-11 sm:px-5 lg:h-[3.3rem] lg:gap-[0.75rem] lg:px-[1.75rem]">
              <Icon name={data.labelIcon} className="size-[1.125rem] text-[var(--color-green)] sm:size-5 lg:size-[1.95rem]" />
              <span className="whitespace-nowrap font-heading text-[0.8rem] font-extrabold text-[var(--color-primary)] sm:text-[1rem] lg:text-[1.45rem]">{data.label}</span>
            </span>
            <span aria-hidden="true" className="hidden h-[0.125rem] w-8 rounded-full bg-[var(--color-green)] sm:block lg:h-[0.1875rem] lg:w-[3.7rem]" />
          </p>

          {/* phones and tablets: the title shrinks with the screen width so it always keeps the design's two lines */}
          <h1 className="mt-5 font-display text-[length:min(2.15rem,calc((100vw-2rem)/11.4))] font-black leading-[1.12] tracking-[-0.005em] sm:text-[length:min(3.4rem,calc((100vw-3rem)/11.4))] md:text-[length:min(3.9rem,calc((100vw-4rem)/11.4))] lg:mt-[1.6rem] lg:text-[5.8rem] lg:leading-[1.08]">
            <span className="block text-[var(--color-primary)]">{data.titleTop}</span>
            <span className="block text-[var(--color-green)]">
              {underlined ? (
                <>
                  {before}
                  <span className="relative inline-block">
                    {data.titleUnderline}
                    <BrushStroke className="left-[36%] top-[96%] h-[0.28em] w-[88%]" />
                  </span>
                  {after}
                </>
              ) : (
                data.titleAccent
              )}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-[40rem] text-[0.95rem] leading-relaxed text-[var(--color-text)] sm:mt-7 sm:text-[1.125rem] lg:mt-[2.15rem] lg:max-w-none lg:text-[1.31rem] lg:leading-[1.5]">
            {data.description}
          </p>
        </div>

        {/* photo in a white trapezoid frame; the blue background stops behind its upper part */}
        <div data-reveal className="relative mx-auto mt-10 w-full max-w-[63.25rem] sm:mt-14 lg:mt-[5.9rem]">
          <div aria-hidden="true" className="absolute -bottom-px left-1/2 top-[28%] w-screen max-w-[120rem] -translate-x-1/2 bg-[var(--color-bg-main)]" />
          <div className="relative drop-shadow-[0_1.125rem_1.875rem_var(--color-shadow-photo)]">
            <div className="bg-[var(--color-white)] p-1.5 [clip-path:url(#heroFrameClip)] sm:p-2 lg:p-[0.65rem]">
              <div className="relative aspect-[1012/544] overflow-hidden [clip-path:url(#heroFrameClip)]">
                <Image src={data.image} alt={data.imageAlt} fill preload quality={90} sizes="(min-width: 1024px) 70vw, 100vw" className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* the four numbers on white below the photo */}
      <div className={`relative bg-[var(--color-bg-main)] pt-12 sm:pt-16 lg:pt-[6.9rem] ${sectionSpaceBottom}`}>
        <ul className="mx-auto grid max-w-[90rem] grid-cols-2 gap-y-10 px-4 sm:px-6 md:px-8 lg:flex lg:items-center lg:justify-between lg:px-[5.6rem]">
          {data.stats.map((stat, index) => (
            <Fragment key={stat.id}>
              {/* thin divider between the numbers (desktop row only) */}
              {index > 0 && <li aria-hidden="true" className="hidden h-[6.6rem] w-px bg-[var(--color-border)] lg:block" />}
              <li data-reveal data-reveal-delay={index * 100} className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 sm:gap-3 lg:gap-[1rem]">
                  <span className={`grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br sm:size-14 lg:size-[4.9rem] ${statTones[stat.tone] ?? statTones.green}`}>
                    <Icon name={stat.icon} className="size-6 sm:size-7 lg:size-[2.8rem]" strokeWidth={2.4} />
                  </span>
                  <span className="font-heading text-[1.55rem] font-extrabold leading-none tracking-[-0.01em] text-[var(--color-primary)] sm:text-[2rem] lg:text-[2.85rem]">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>
                <span className="mt-1.5 font-heading text-[0.85rem] font-medium text-[var(--color-primary-strong)] sm:text-[1rem] lg:mt-[0.1rem] lg:text-[1.35rem]">{stat.label}</span>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
};
