import { Footer } from "@/components/sections/Footer";
import { LegalPage } from "@/components/sections/LegalPage";
import { footer, legalPages, site } from "@/content/landing";
import { legalMetadata } from "@/lib/legal-metadata";

const page = legalPages.privacidad;

export const metadata = legalMetadata(page, "/privacidad");

export default function PrivacidadPage() {
  return (
    <>
      <LegalPage brand={site.name} {...page} />
      <Footer brand={site.name} legalName={site.legalName} year={site.copyrightYear} email={site.email} {...footer} />
    </>
  );
}
