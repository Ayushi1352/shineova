"use client";

import { useState } from "react";
import type { EnquiryFormData } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonArrow, buttonClass } from "@/components/ui/buttonStyles";

/** Outlined fields with an icon on the left */
const base =
  "w-full appearance-none rounded-[0.6rem] border-[0.09375rem] border-[var(--color-border-field)] bg-[var(--color-white)] pl-11 pr-4 font-heading text-sm font-medium text-[var(--color-primary)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] hover:border-[var(--color-green-border)] focus:border-[var(--color-green)] focus:ring-2 focus:ring-[var(--color-green-15)] lg:pl-[3.3rem] lg:text-[0.95rem]";
const field = `${base} h-12 lg:h-[2.5rem]`;
const iconClass = "pointer-events-none absolute left-4 size-[1.125rem] text-[var(--color-primary)] lg:left-[1.6rem] lg:size-[1.2rem]";

const Field = ({ icon, className = "", children }: { icon: string; className?: string; children: React.ReactNode }) => (
  <div className={`relative flex items-center ${className}`}>
    {children}
    <Icon name={icon} className={`${iconClass} top-1/2 -translate-y-1/2`} strokeWidth={2.4} />
  </div>
);

/** Service list; it shows its placeholder until a service is picked */
const ServiceSelect = ({ icon, placeholder, options }: { icon: string; placeholder: string; options: string[] }) => {
  const [value, setValue] = useState("");

  return (
    <Field icon={icon}>
      <select
        name="service"
        required
        value={value}
        onChange={(event) => setValue(event.target.value)}
        aria-label={placeholder}
        className={`${field} cursor-pointer pr-11 ${value ? "" : "text-[var(--color-text-muted)]"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Icon name="FiChevronDown" className="pointer-events-none absolute right-4 top-1/2 size-[1.125rem] -translate-y-1/2 text-[var(--color-primary)] lg:right-[1rem]" strokeWidth={2.6} />
    </Field>
  );
};

/** Contact form with a dummy submit: sending state, then a thank-you message in place of the button */
export const EnquiryForm = ({ data, serviceOptions }: { data?: EnquiryFormData; serviceOptions: string[] }) => {
  const submit = useDummySubmit();
  if (!data) return null;
  const { fields } = data;

  // remounting the form (via key) after each send clears every field, including the controlled select
  return (
    <form
      key={submit.round}
      onSubmit={submit.onSubmit}
      onInput={submit.onInput}
      aria-busy={submit.sending}
      className="mt-5 grid gap-4 sm:grid-cols-2 lg:mt-[1.4rem] lg:gap-x-[1.35rem] lg:gap-y-[1.05rem]"
    >
      <Field icon={fields.name.icon}>
        <input name="name" required placeholder={fields.name.placeholder} aria-label={fields.name.placeholder} autoComplete="name" className={field} />
      </Field>
      <Field icon={fields.email.icon}>
        <input name="email" type="email" required placeholder={fields.email.placeholder} aria-label={fields.email.placeholder} autoComplete="email" className={field} />
      </Field>
      <Field icon={fields.phone.icon}>
        <input name="phone" type="tel" required placeholder={fields.phone.placeholder} aria-label={fields.phone.placeholder} autoComplete="tel" className={field} />
      </Field>
      <ServiceSelect icon={fields.service.icon} placeholder={fields.service.placeholder} options={serviceOptions} />
      <div className="relative sm:col-span-2">
        <textarea
          name="message"
          required
          rows={4}
          placeholder={fields.message.placeholder}
          aria-label={fields.message.placeholder}
          className={`${base} block h-28 resize-none pt-3 lg:h-[6.9rem] lg:pt-[0.85rem]`}
        />
        <Icon name={fields.message.icon} className={`${iconClass} top-[0.85rem] lg:top-[1rem]`} strokeWidth={2.4} />
      </div>

      {/* the thank-you message takes the place of the button, inside the form, so it never covers the fields */}
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="sm:col-span-2 lg:mt-[0.1rem]"
        />
      ) : (
        <button
          type="submit"
          disabled={submit.sending}
          className={`${buttonClass} mx-auto h-12 w-full gap-3 text-base sm:col-span-2 sm:w-[20rem] lg:mt-[0.1rem] lg:h-[3.05rem] lg:text-[1.3rem]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="FiArrowRight" className={`size-5 lg:size-[1.5rem] ${buttonArrow}`} />
            </>
          )}
        </button>
      )}
    </form>
  );
};
