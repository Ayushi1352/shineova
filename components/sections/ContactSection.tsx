import Image from "next/image";
import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { sectionSpace } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

type Props = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
  /** choices of the form's service list (built in app/page.tsx from the Services section) */
  serviceOptions: string[];
};

/** Centred heading; contact details on the left, the cleaning-supplies photo in the middle (desktop) and the message card on the right */
export const ContactSection = ({ data, form, company, serviceOptions }: Props) => {
  if (!data) return null;

  return (
    <section
      id={data.id}
      className={`relative scroll-mt-[4.5rem] overflow-hidden bg-gradient-to-b from-[var(--color-bg-main)] via-[var(--color-bg-contact)] via-[12%] to-[var(--color-bg-contact)] sm:scroll-mt-[5rem] lg:scroll-mt-[6.4rem] ${sectionSpace}`}
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 md:px-8 lg:px-[2.8rem]">
        <div data-reveal className="text-center">
          <Eyebrow
            label={data.label}
            icon={data.labelIcon}
            lines="both"
            className={`${labelSize} font-extrabold text-[var(--color-primary-dark)] lg:text-[2.1rem]`}
            lineClassName="w-10 sm:w-16 lg:w-[5.6rem]"
          />
          <h2 className={`mt-2 font-heading font-black tracking-[-0.005em] text-[var(--color-primary-dark)] ${titleSize} lg:mt-[0.45rem] lg:text-[2.87rem]`}>
            {data.titleTop} <span className="text-[var(--color-green-bright)]">{data.titleAccent}</span>
          </h2>
          <p className="mt-3 font-heading text-[0.95rem] font-medium text-[var(--color-text-muted)] sm:text-[1.125rem] lg:mt-[0.75rem] lg:text-[1.5rem]">{data.description}</p>
        </div>

        <div className="relative mt-10 flex flex-col gap-10 lg:mt-[1.6rem] lg:flex-row lg:items-start lg:gap-0">
          <ul data-reveal className="relative z-10 grid gap-6 sm:grid-cols-2 lg:w-[19.5rem] lg:grid-cols-1 lg:gap-0 lg:pl-[0.6rem] lg:pt-[2.2rem]">
            {company.contactItems.map((item, index) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id} className={`lg:py-[1.45rem] ${index > 0 ? "lg:border-t lg:border-[var(--color-border-light)]" : "lg:pt-0"}`}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex w-fit items-start gap-4 lg:gap-[1.5rem]"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-[0.75rem] bg-[var(--color-green-light)] text-[var(--color-green)] transition-colors group-hover:bg-[var(--color-green)] group-hover:text-[var(--color-white)] lg:size-[4rem]">
                      <Icon name={item.icon} className="size-6 lg:size-[1.95rem]" />
                    </span>
                    <span>
                      <span className="block font-heading text-lg font-extrabold leading-tight text-[var(--color-primary-dark)] lg:text-[1.5rem]">{item.title}</span>
                      {item.lines.map((line) => (
                        <span key={line} className="mt-0.5 block font-heading text-[0.9rem] font-medium leading-[1.4] text-[var(--color-text-muted)] transition-colors group-hover:text-[var(--color-green-dark)] lg:mt-[0.2rem] lg:text-[1.1rem]">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* desktop: the supplies photo stands between the details and the form, fading into the background */}
          <div className="absolute bottom-0 left-[22rem] hidden size-[26.5rem] [mask-image:radial-gradient(ellipse_70%_75%_at_55%_60%,black_55%,transparent_100%)] lg:block">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="34vw" className="object-cover object-bottom" />
          </div>

          <div
            data-reveal
            className="relative z-10 w-full rounded-[1.6rem] border-[0.1875rem] border-transparent px-5 pb-7 pt-7 shadow-[0_0.875rem_2.5rem_var(--color-shadow-card)] [background:linear-gradient(var(--color-white),var(--color-white))_padding-box,linear-gradient(180deg,var(--color-bg-form-edge)_0%,var(--color-bg-form-edge-mid)_30%,var(--color-green-border)_70%,var(--color-green-bright)_100%)_border-box] sm:px-8 lg:ml-auto lg:w-[39.1rem] lg:rounded-[2.3rem] lg:px-[2.1rem] lg:pb-[1.85rem] lg:pt-[1.7rem]"
          >
            <h3 className="font-heading text-2xl font-extrabold leading-tight text-[var(--color-primary-dark)] lg:text-[1.9rem]">{data.formTitle}</h3>
            <span aria-hidden="true" className="mt-2 block h-1 w-16 rounded-full bg-[var(--color-green)] lg:mt-[0.55rem] lg:w-[4.3rem]" />
            <EnquiryForm data={form} serviceOptions={serviceOptions} />
          </div>
        </div>
      </div>
    </section>
  );
};
