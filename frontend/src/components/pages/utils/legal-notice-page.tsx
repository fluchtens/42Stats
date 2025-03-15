import { PageHeader } from "@/components/core/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </section>
);

export const LegalNoticePage = () => {
  return (
    <div className="max-w-screen-lg m-auto">
      <PageHeader title="Legal Notice" description="Last updated: 15/03/2025" />
      <Card className="mt-4">
        <CardContent className="p-6 space-y-6">
          <Section title="Publisher information">
            <p className="text-sm">
              This website is published by <strong>François Luchtens</strong>.
            </p>
          </Section>
          <Section title="Website host">
            <p className="text-sm">The website is hosted by OVH, located at 2 rue Kellermann, 59100 Roubaix, France.</p>
            <p className="text-sm">
              If you need to contact the host, you can reach them at <strong>+33 9 72 10 10 07</strong> or visit their website at{" "}
              <a href="https://www.ovh.com">https://www.ovh.com</a>.
            </p>
          </Section>
          <Section title="Content and publication responsibility">
            <p className="text-sm">
              The person responsible for the content of this website is <strong>François Luchtens</strong>, who can be contacted at{" "}
              <strong>fluchtens.pro@gmail.com</strong>.
            </p>
          </Section>
          <Section title="Data collection and use">
            <p className="text-sm">
              We collect certain personal data to ensure the proper functioning of the site and improve your user experience. For more details, please
              refer to our{" "}
              <Link to="/privacy-policy">
                <strong>Privacy Policy</strong>
              </Link>
              .
            </p>
          </Section>
          <Section title="Contact information">
            <p className="text-sm">
              If you have any questions or concerns, feel free to contact us at <strong>fluchtens.pro@gmail.com</strong>.
            </p>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};
