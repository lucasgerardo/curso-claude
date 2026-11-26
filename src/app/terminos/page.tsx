import { Footer } from "@/components/sections/Footer";
import { LegalPage } from "@/components/sections/LegalPage";
import { footer, legalPages, site } from "@/content/landing";
import { legalMetadata } from "@/lib/legal-metadata";

const page = legalPages.terminos;

export const metadata = legalMetadata(page, "/terminos");

export default function TerminosPage() {
  return (
    <>
      <LegalPage brand={site.name} {...page} />
      <Footer brand={site.name} legalName={site.legalName} year={site.copyrightYear} email={site.email} {...footer} />
    </>
  );
}
