import rawData from "@/data/templates.json";
import type { ShineovaTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const templateData: ShineovaTemplateData = rawData;
const sectionData = templateData.categories.Cleaning.sections;
const commonData = templateData.common;

// The form's service list: every service card title, on one line ("Sofa & Upholstery Cleaning")
const serviceOptions = (sectionData.Services?.variants?.CleaningServices1?.items ?? []).map((item) => item.title.replace(/\s*\n\s*/g, " "));

/*
  One landing page, sections in the order of the design. Each section's id (templates.json) matches the
  menu links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.CleaningHero1} />
      <AboutSection data={sectionData.About?.variants?.CleaningAbout1} />
      <ServicesSection data={sectionData.Services?.variants?.CleaningServices1} />
      <WhySection data={sectionData.Why?.variants?.CleaningWhy1} />
      <ProcessSection data={sectionData.Process?.variants?.CleaningProcess1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.CleaningTestimonials1} />
      <ContactSection
        data={sectionData.Contact?.variants?.CleaningContact1}
        form={sectionData.EnquiryForm?.variants?.CleaningEnquiryForm1}
        company={commonData.company}
        serviceOptions={serviceOptions}
      />
    </main>
  );
}
