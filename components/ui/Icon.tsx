import type { IconBaseProps, IconType } from "react-icons";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaLeaf,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaUsers,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiArrowRight, FiChevronDown, FiLayers, FiMail, FiMessageSquare, FiPhone, FiUser } from "react-icons/fi";
import { LuCalendarCheck, LuCheck, LuChevronRight, LuHeart, LuLeaf, LuShieldCheck, LuX } from "react-icons/lu";
import { RiDoubleQuotesL } from "react-icons/ri";

// Icons drawn for this design (react-icons has no close match): same props as the library icons.

/** Angled broom with sparkles beside it (the Contact Us label) */
const BroomSparkle: IconType = ({ className }: IconBaseProps) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-hidden="true">
    <path d="M58.6 4.2a2 2 0 0 1 .3 2.8L37.2 33.4l-3.1-2.6L55.8 4.5a2 2 0 0 1 2.8-.3Z" />
    <path d="M31.4 30.2l6.4 5.4c1 .9 1.2 2.4.3 3.4l-1.6 1.9-10-8.4 1.6-1.9c.9-1 2.3-1.2 3.3-.4Z" />
    <path d="M24.8 34.4l10.4 8.8C31 52 22.6 58.6 12.6 60.6a1.6 1.6 0 0 1-1.4-2.6l3.4-4.2-6.8 3.4a1.6 1.6 0 0 1-2-2.4l5.6-6.4-5 1.8a1.6 1.6 0 0 1-1.8-2.6c5.2-6.6 11.6-11.2 20.2-13.2Z" />
    <path d="M14 4l1.4 4.2L19.6 9.6l-4.2 1.4L14 15.2l-1.4-4.2L8.4 9.6l4.2-1.4Z" />
    <path d="M26 11l.9 2.6 2.6.9-2.6.9L26 18l-.9-2.6-2.6-.9 2.6-.9Z" />
    <circle cx="6" cy="20" r="2" />
    <circle cx="21" cy="3.5" r="1.6" />
  </svg>
);

/** Filled house with a small sparkle at its top-right ("Homes Cleaned") */
const HomeSparkle: IconType = ({ className }: IconBaseProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M11 3.6 1.8 11.5c-.5.4-.2 1.2.4 1.2h1.9v7.6c0 .6.4 1 1 1h3.7v-5.6h4.4v5.6h3.7c.6 0 1-.4 1-1v-7.6h1.9c.6 0 .9-.8.4-1.2L12.3 3.6a1 1 0 0 0-1.3 0Z" />
    <path d="M19.6.6l.65 1.85 1.85.65-1.85.65-.65 1.85-.65-1.85-1.85-.65 1.85-.65Z" />
  </svg>
);

/** Scalloped award rosette with a star in the middle and two ribbon tails (satisfaction, experience) */
const RosetteStar: IconType = ({ className, strokeWidth = 1.8 }: IconBaseProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      d="M12 1.6l1.71 1.22 2.09-.2.87 1.91 1.91.87-.2 2.09 1.22 1.71-1.22 1.71.2 2.09-1.91.87-.87 1.91-2.09-.2L12 16.8l-1.71-1.22-2.09.2-.87-1.91-1.91-.87.2-2.09L4.4 9.2l1.22-1.71-.2-2.09 1.91-.87.87-1.91 2.09.2Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M12 6.1l.79 2.01 2.16.13-1.67 1.38.54 2.09L12 10.55l-1.82 1.16.54-2.09-1.67-1.38 2.16-.13Z" fill="currentColor" />
    <path d="m8.3 15.6-1.9 5.6 2.7-.9 1.5 2.2 1.1-5.3M15.7 15.6l1.9 5.6-2.7-.9-1.5 2.2-1.1-5.3" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
  </svg>
);

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  BroomSparkle,
  HomeSparkle,
  RosetteStar,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaHome,
  FaInstagram,
  FaLeaf,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
  FaUsers,
  FaXTwitter,
  FaYoutube,
  FiArrowRight,
  FiChevronDown,
  FiLayers,
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiUser,
  LuCalendarCheck,
  LuCheck,
  LuChevronRight,
  LuHeart,
  LuLeaf,
  LuShieldCheck,
  LuX,
  RiDoubleQuotesL,
};

type Props = {
  name: string;
  className?: string;
  // Line thickness of the outline icons (Fi, Lu and the drawn rosette); the filled icons (Fa, Ri) keep their own shape.
  strokeWidth?: number;
};

export const Icon = ({ name, className, strokeWidth }: Props) => {
  const Component = icons[name] ?? LuCheck;
  const filled = name.startsWith("Fa") || name.startsWith("Ri");
  return <Component className={className} strokeWidth={filled ? undefined : strokeWidth} aria-hidden="true" />;
};
