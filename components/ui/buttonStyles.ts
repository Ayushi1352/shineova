/** Green pill button shared by the menu and the contact form: turns navy on hover (a fading layer, so the gradient changes smoothly) */
export const buttonClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[var(--color-green-button)] to-[var(--color-green-deep)] font-heading font-extrabold text-[var(--color-white)] shadow-[0_0.5rem_1.125rem_var(--color-shadow-green-button)] transition-transform duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[var(--color-primary)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:before:opacity-100 disabled:cursor-wait disabled:opacity-80";
/** arrow inside a button that turns up-right on hover */
export const buttonArrow = "shrink-0 transition-transform duration-300 group-hover:-rotate-45";
