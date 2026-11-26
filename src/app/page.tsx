import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Requirements } from "@/components/sections/Requirements";
import { Simulator } from "@/components/sections/Simulator";
import { Testimonials } from "@/components/sections/Testimonials";
import {
  ctaBanner,
  faq,
  features,
  footer,
  hero,
  nav,
  requirements,
  sections,
  simulator,
  site,
  steps,
  testimonials,
} from "@/content/landing";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FinancialService",
      name: site.name,
      url: site.url,
      description: site.description,
      email: site.email,
      areaServed: "AR",
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header brand={site.name} links={nav} cta={hero.primaryCta} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero {...hero} />
        <Features id="beneficios" items={features} {...sections.features} />
        <HowItWorks id="como-funciona" steps={steps} {...sections.howItWorks} />
        <Simulator id="simulador" whatsapp={site.whatsapp} {...simulator} />
        <Requirements id="requisitos" {...requirements} />
        <Testimonials id="testimonios" items={testimonials} {...sections.testimonials} />
        <Faq id="preguntas" items={faq} {...sections.faq} />
        <CtaBanner id="empezar" {...ctaBanner} />
      </main>
      <Footer brand={site.name} legalName={site.legalName} year={site.copyrightYear} email={site.email} {...footer} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
