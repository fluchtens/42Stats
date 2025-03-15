import { PageHeader } from "@/components/core/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="space-y-2">
    <h2 className="text-lg font-semibold">{title}</h2>
    {children}
  </section>
);

const List = ({ items }: { items: string[] }) => (
  <ul className="pl-5 list-disc">
    {items.map((item, index) => (
      <li key={index} className="text-sm">
        {item}
      </li>
    ))}
  </ul>
);

export const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-screen-lg m-auto">
      <PageHeader title="Privacy Policy" description="Last updated: 15/03/2025" />
      <Card className="mt-4">
        <CardContent className="p-6 space-y-6">
          <Section title="Data we collect">
            <List
              items={[
                "Your unique 42 account identifier",
                "Your login (username) 42",
                "Link to your profile photo 42",
                "Your cursus experience level",
                "Your primary campus ID",
                "Timestamp of your first connection to 42stats",
                "Timestamp of your last connection to 42stats",
              ]}
            />
            <p className="text-sm">This information can be consulted at any time in your account settings.</p>
          </Section>
          <Section title="Purpose of data collection">
            <p>We collect this data to:</p>
            <List
              items={[
                "Identify you to your account.",
                "Know your campus for the leaderboard.",
                "Calculate your XP level in the XP calculator.",
                "Manage the devices on which you are connected.",
                "Create statistics specific to the 42stats platform.",
                "Ensure the proper functioning of the site and improve user experience.",
              ]}
            />
            <p className="text-sm">
              We <strong>do not share</strong> your data with third parties for commercial purposes.
            </p>
          </Section>
          <Section title="Data storage & security">
            <p className="text-sm">Your data is securely stored and accessible only to site administrators.</p>
            <List
              items={[
                "Data deletion: You can request deletion of your data by contacting us at fluchtens.pro@gmail.com, or by deleting your account yourself from the settings page.",
              ]}
            />
          </Section>
          <Section title="Cookies & tracking">
            <p className="text-sm">
              We only use <strong>essential cookies</strong> to ensure the proper functioning of the site. No data is used for advertising purposes.
            </p>
          </Section>
          <Section title="Your rights">
            <p className="text-sm">
              Under the <strong>GDPR</strong>, you have the right to:
            </p>
            <List items={["Access your data.", "Request corrections or deletion of your data.", "Withdraw your consent at any time."]} />
            <p>For any inquiries, feel free to contact us at fluchtens.pro@gmail.com.</p>
          </Section>
        </CardContent>
      </Card>
    </div>
  );
};
