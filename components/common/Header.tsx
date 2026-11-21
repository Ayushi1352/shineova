"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/buttonStyles";
import { sectionId, useActiveSection } from "@/components/ui/useActiveSection";

/**
 * Logo on the left; "Call Us" phone button and the menu button on the right, on every screen (as in the design).
 * The bar is see-through over the hero and turns white once the page scrolls or the menu opens.
 */
export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const active = useActiveSection(data?.navLinks.map((link) => link.url) ?? []);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!data) return null;
  const call = company.contactItems.find((item) => item.id === data.callItemId);

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mx-auto max-w-[120rem] transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-[var(--color-white-95)] shadow-[0_0.25rem_1.25rem_var(--color-shadow-header)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex h-[4.5rem] items-center justify-between px-4 sm:h-[5rem] sm:px-6 lg:h-[6.4rem] lg:pl-[1.3rem] lg:pr-[2.9rem]">
        <Link href={data.logoUrl} onClick={goHome} aria-label={data.homeLabel} className="shrink-0">
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            preload
            sizes="(min-width: 1024px) 15vw, 170px"
            className="h-auto w-[8.5rem] sm:w-[10.5rem] lg:w-[13rem]"
          />
        </Link>

        <div className="flex items-center gap-4 sm:gap-6 lg:gap-[2.5rem]">
          {call && (
            <a href={call.url} aria-label={`${data.callLabel} ${call.lines.join(" ")}`} className="group relative flex items-center">
              <span className="relative z-10 grid size-10 place-items-center rounded-full border-[0.1875rem] border-[var(--color-green)] bg-[var(--color-primary)] text-[var(--color-white)] transition-colors group-hover:bg-[var(--color-green)] sm:mt-2 sm:size-11 lg:mt-[0.85rem] lg:size-[3.1rem]">
                <Icon name={call.icon} className="size-[1.125rem] lg:size-[1.6rem]" />
              </span>
              <span className="relative -ml-4 hidden sm:block lg:-ml-[1.1rem]">
                <span className="absolute -top-[1.05rem] left-5 rounded-t-[0.4rem] bg-[var(--color-green)] px-2 pb-[0.35rem] pt-[0.3rem] font-heading text-[0.7rem] font-extrabold uppercase leading-none tracking-wide text-[var(--color-white)] lg:-top-[1.2rem] lg:left-[1.4rem] lg:px-[0.55rem] lg:text-[0.8rem]">
                  {data.callLabel}
                </span>
                <span className="block whitespace-nowrap rounded-l-[0.3rem] rounded-r-[0.6rem] border-b-[0.1875rem] border-[var(--color-green)] bg-[var(--color-primary-soft)] py-[0.65rem] pl-6 pr-4 font-heading text-[0.95rem] font-bold leading-none text-[var(--color-white)] transition-colors group-hover:bg-[var(--color-green)] lg:py-[0.7rem] lg:pl-[1.85rem] lg:pr-[0.7rem] lg:text-[1.1rem]">
                  {call.lines.join(" ")}
                </span>
              </span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            className="group flex h-10 w-9 flex-col justify-center gap-[0.4rem] lg:w-[3.8rem] lg:gap-[0.6rem]"
          >
            <span className={`block h-[0.1875rem] w-full rounded-full transition-all duration-300 group-hover:bg-[var(--color-green)] lg:h-[0.25rem] ${open ? "translate-y-[0.5875rem] rotate-45 bg-[var(--color-green)] lg:translate-y-[0.85rem]" : "bg-[var(--color-primary-dark)]"}`} />
            <span className={`block h-[0.1875rem] rounded-full bg-[var(--color-primary-dark)] transition-all duration-300 group-hover:bg-[var(--color-green)] lg:h-[0.25rem] ${open ? "w-0 opacity-0" : "w-full group-hover:w-[70%]"}`} />
            <span className={`ml-auto block h-[0.1875rem] rounded-full transition-all duration-300 group-hover:bg-[var(--color-green)] lg:h-[0.25rem] ${open ? "w-full -translate-y-[0.5875rem] -rotate-45 bg-[var(--color-green)] lg:-translate-y-[0.85rem]" : "w-[60%] bg-[var(--color-primary-dark)] group-hover:w-full"}`} />
          </button>
        </div>
      </div>

      {/* the page behind the open menu is dimmed, a tap on it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[4.5rem] -z-10 bg-[var(--color-primary-50)] transition-opacity duration-500 sm:top-[5rem] lg:top-[6.4rem] ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <nav
        id="site-menu"
        aria-label={data.mobileNavLabel}
        // a panel only as tall as its links (full width on phones, a card on the right from tablets up); scrolls if they do not fit
        className={`absolute inset-x-0 top-full grid max-h-[calc(100dvh-4.5rem)] overflow-hidden border-t border-[var(--color-divider)] bg-[var(--color-white)] shadow-[0_1.25rem_2.5rem_-1rem_var(--color-shadow-card)] transition-[grid-template-rows,opacity] duration-500 sm:left-auto sm:right-6 sm:w-[20rem] sm:rounded-b-2xl lg:right-[2.9rem] lg:w-[21rem] ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-3 lg:px-[1.5rem]">
            {data.navLinks.map((link) => {
              const current = sectionId(link.url) === active;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? undefined : -1}
                    aria-current={current ? "location" : undefined}
                    className={`group flex items-center justify-between border-b border-[var(--color-divider)] py-3.5 font-heading text-base font-semibold transition-colors hover:text-[var(--color-green)] lg:text-[1.05rem] ${
                      current ? "text-[var(--color-green)]" : "text-[var(--color-primary)]"
                    }`}
                  >
                    {link.label}
                    <Icon name="LuChevronRight" className="size-4 text-[var(--color-green)] transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                  </a>
                </li>
              );
            })}
            {call && (
              <li className="pb-2 pt-5">
                <a
                  href={call.url}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? undefined : -1}
                  className={`${buttonClass} h-12 w-full gap-3`}
                >
                  <Icon name={call.icon} className="size-4" />
                  {call.lines.join(" ")}
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};
