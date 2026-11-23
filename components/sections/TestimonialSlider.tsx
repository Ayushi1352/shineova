"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

const AUTOPLAY_MS = 6000;

/** White round arrow button with a green ring; fills green on hover */
const arrowClass =
  "grid size-11 shrink-0 place-items-center rounded-full border-2 border-[var(--color-green-border)] bg-[var(--color-white)] text-[var(--color-primary-dark)] shadow-[0_0.375rem_0.875rem_var(--color-shadow-button)] transition-colors hover:border-[var(--color-green)] hover:bg-[var(--color-green)] hover:text-[var(--color-white)] lg:size-[3.5rem]";

/**
 * One review at a time: quote, name, role and stars on the left, the client's photo on the right (photo first on phones).
 * Phones and tablets: no arrows, only the dots below the review; from 1024px up arrows sit on both sides (as in the design).
 * Moves on by itself every few seconds and waits while a mouse is over it. Only a real mouse pauses it: a tap on a
 * touch screen also fires "mouse enter" but never "mouse leave", which would stop the slider for good on phones and tablets.
 */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const [index, setIndex] = useState(Math.min(data.startIndex, items.length - 1));
  const [paused, setPaused] = useState(false);
  const item = items[index];
  const ratingLabel = fill(data.ratingLabel, { rating: data.rating });
  const go = (step: number) => setIndex((current) => (current + step + items.length) % items.length);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % items.length), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, items.length]);

  if (!item) return null;

  const previous = (
    <button type="button" onClick={() => go(-1)} aria-label={data.previousLabel} className={arrowClass}>
      <Icon name="FaChevronLeft" className="size-3.5 lg:size-[1.1rem]" />
    </button>
  );
  const next = (
    <button type="button" onClick={() => go(1)} aria-label={data.nextLabel} className={arrowClass}>
      <Icon name="FaChevronRight" className="size-3.5 lg:size-[1.1rem]" />
    </button>
  );

  return (
    <div
      onPointerEnter={(event) => event.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setPaused(false)}
    >
      <div className="flex items-center gap-4 lg:justify-between lg:gap-0">
        <div className="hidden lg:block">{previous}</div>

        {/* keyed by review, so a new review fades in */}
        <div
          key={item.id}
          aria-live="polite"
          className="flex flex-1 flex-col-reverse gap-8 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-4 starting:opacity-0 md:flex-row md:items-center md:gap-10 lg:gap-[2.5rem] lg:pl-[4.25rem] lg:pr-[3.9rem]"
        >
          <blockquote className="min-w-0 flex-1 lg:-mt-[0.6rem]">
            <span className="grid h-12 w-14 place-items-center rounded-[0.65rem] bg-[var(--color-green-quote)] text-[var(--color-green)] lg:h-[3.5rem] lg:w-[5.25rem]">
              <Icon name="RiDoubleQuotesL" className="size-8 lg:size-[3rem]" />
            </span>
            {/* the review's line breaks (\n in the JSON) are kept from 1024px up */}
            <p className="mt-4 font-heading text-lg font-semibold italic leading-[1.5] text-[var(--color-primary-dark)] sm:text-xl lg:mt-[0.6rem] lg:whitespace-pre-line lg:pl-[1.4rem] lg:text-[1.68rem] lg:leading-[1.4]">
              {item.quote}
            </p>
            <span aria-hidden="true" className="mt-5 block h-[0.1875rem] w-20 bg-[var(--color-green)] lg:ml-[1.4rem] lg:mt-[1.6rem] lg:w-[6.3rem]" />
            <footer className="mt-5 flex items-center lg:mt-[1.5rem] lg:pl-[1.4rem]">
              <span>
                <cite className="block font-heading text-xl font-black not-italic leading-tight text-[var(--color-primary-dark)] lg:text-[1.8rem]">{item.name}</cite>
                <span className="mt-0.5 block font-heading text-[0.95rem] text-[var(--color-text-soft)] lg:mt-[0.3rem] lg:text-[1.25rem]">{item.role}</span>
              </span>
              <span aria-hidden="true" className="mx-5 h-11 w-[0.125rem] bg-[var(--color-text-quiet)] lg:ml-[3.4rem] lg:mr-[2.4rem] lg:h-[3.4rem]" />
              <span role="img" aria-label={ratingLabel} className="flex gap-1 text-[var(--color-star)] lg:gap-[0.3rem]">
                {Array.from({ length: data.rating }, (_, n) => (
                  <Icon key={n} name="FaStar" className="size-[1.125rem] lg:size-[1.55rem]" />
                ))}
              </span>
            </footer>
          </blockquote>

          <div className="relative w-full shrink-0 self-center pr-4 pt-4 md:w-[42%] lg:w-[24rem] lg:pr-[1.6rem] lg:pt-[1.6rem]">
            <span
              aria-hidden="true"
              className="absolute right-0 top-0 h-[42%] w-[48%] rounded-[1.4rem] bg-gradient-to-br from-[var(--color-green-accent-from)] to-[var(--color-green-accent-to)] lg:h-[9.2rem] lg:w-[11.25rem] lg:rounded-[2rem]"
            />
            <div className="relative aspect-[383/328] overflow-hidden rounded-[1.4rem] border-2 border-[var(--color-white)] shadow-[0_0.625rem_1.875rem_var(--color-shadow-card)] lg:rounded-[1.9rem]">
              <Image src={item.image} alt={item.name} fill quality={90} sizes="(min-width: 1024px) 27vw, (min-width: 768px) 42vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">{next}</div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-5 lg:mt-[2.3rem]">
        <div className="flex items-center gap-[0.9rem]">
          {items.map((review, n) => (
            <button
              key={review.id}
              type="button"
              aria-label={fill(data.showLabel, { name: review.name })}
              aria-current={n === index}
              onClick={() => setIndex(n)}
              className={`size-3.5 rounded-full transition-colors lg:size-[0.95rem] ${n === index ? "bg-[var(--color-green)]" : "bg-[var(--color-dot)] hover:bg-[var(--color-green-ring)]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
