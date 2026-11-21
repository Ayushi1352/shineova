export interface ThemeFonts {
  primary: string;
  heading: string;
  display: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  icon: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  icon: string;
  title: string;
  lines: string[];
  url: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
}

export interface SocialLink {
  id: string;
  icon: string;
  label: string;
  url: string;
}

export interface FooterData {
  socialTitle: string;
  socialLinks: SocialLink[];
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  callLabel: string;
  /** id of the company contact item the "Call Us" button dials */
  callItemId: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

export interface StatItem {
  id: string;
  icon: string;
  /** number the counter runs up to */
  value: number;
  /** shown right after the number, e.g. "+" or "%" */
  suffix?: string;
  label: string;
  /** "green" or "blue" icon background */
  tone: string;
}

export interface HeroData {
  id: string;
  label: string;
  labelIcon: string;
  titleTop: string;
  titleAccent: string;
  /** part of titleAccent drawn with the green brush stroke under it */
  titleUnderline: string;
  description: string;
  image: string;
  imageAlt: string;
  stats: StatItem[];
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  /** "green" or "blue" icon background */
  tone: string;
}

export interface AboutData {
  id: string;
  label: string;
  titleTop: string;
  titleBottom: string;
  description: string;
  features: FeatureItem[];
}

export interface ServiceItem {
  id: string;
  /** "\n" starts a new line of the title */
  title: string;
  description: string;
  tags: { id: string; text: string }[];
  image: string;
  imageAlt: string;
}

export interface ServicesData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  titleBottom: string;
  items: ServiceItem[];
}

export interface WhyPoint {
  id: string;
  icon: string;
  title: string;
  text: string;
}

export interface WhyData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  points: WhyPoint[];
  image: string;
  imageAlt: string;
  badge: {
    icon: string;
    value: number;
    suffix: string;
    label: string;
    text: string;
  };
}

export interface ProcessStep {
  id: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
}

export interface ProcessData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  steps: ProcessStep[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

export interface TestimonialsData {
  id: string;
  label: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  rating: number;
  ratingLabel: string;
  startIndex: number;
  showLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: TestimonialItem[];
}

export interface ContactData {
  id: string;
  label: string;
  labelIcon: string;
  titleTop: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  formTitle: string;
}

export interface FormField {
  placeholder: string;
  icon: string;
}

export interface ContactFormData {
  fields: {
    name: FormField;
    email: FormField;
    phone: FormField;
    service: FormField;
    message: FormField;
  };
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface ShineovaTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    Cleaning: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Why?: Variants<WhyData>;
        Process?: Variants<ProcessData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        ContactForm?: Variants<ContactFormData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
