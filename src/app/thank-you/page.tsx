import type { Metadata } from "next";
import { ContentPage, PageSection } from "../_components/content-page";

export const metadata: Metadata = {
  title: "Thank You | Vedavani Pathashala",
  description:
    "A thank-you page for contact, volunteer or support submissions made through this provisional website.",
};

export default function ThankYouPage() {
  return (
    <ContentPage
      activePath="/thank-you"
      eyebrow="Thank you"
      title={<>Thank you for your <em>interest.</em></>}
      description="We appreciate your interest in Avighna Trust and Vedavani Pathashala."
    >
      <PageSection eyebrow="A general acknowledgement page" title={<>This page does not confirm a submission.</>}>
        <p>
          If you sent an enquiry, its receipt depends on the form showing a
          successful confirmation. Opening this page directly does not mean a
          message, registration or donation was received.
        </p>
        <p>
          This site does not process payments. A donation or payment must never
          be considered successful based on this page.
        </p>
      </PageSection>
    </ContentPage>
  );
}
