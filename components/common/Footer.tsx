import type { FooterData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

// One dark green bar: copyright on the left; a thin line and the round social links on the right.
export const Footer = async ({ data }: { data?: FooterData }) => {
  if (!data) return null;
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="bg-[var(--color-footer)] text-[var(--color-white)]">
      <div className="mx-auto flex max-w-[90rem] flex-col-reverse items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:h-[4.15rem] lg:py-0 lg:pl-[2.7rem] lg:pr-[2.9rem]">
        <p className="text-center font-heading text-sm font-semibold sm:text-left sm:text-[1rem] lg:text-[1.45rem]">{copyright}</p>
        <div className="flex items-center">
          <span aria-hidden="true" className="mr-5 hidden h-9 w-[0.125rem] bg-[var(--color-white-90)] sm:block lg:mr-[2.25rem] lg:h-[2.6rem]" />
          <ul aria-label={data.socialTitle} className="flex items-center gap-3 lg:gap-[1rem]">
            {data.socialLinks.map((social) => (
              <li key={social.id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="grid size-9 place-items-center rounded-full bg-[var(--color-white)] text-[var(--color-footer)] transition-colors hover:bg-[var(--color-green-bright)] hover:text-[var(--color-white)] lg:size-[2.6rem]"
                >
                  <Icon name={social.icon} className="size-4 lg:size-[1.3rem]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
