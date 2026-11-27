import type { Metadata } from "next";
import { ContentPage, PageSection } from "../../_components/content-page";

export const metadata: Metadata = {
  title: "Donation Acknowledgement | Vedavani Pathashala",
  description:
    "A confirmation page for donation-related interest while the institution confirms its live payment arrangements.",
};

export default function DonationThankYouPage() {
  return (
    <ContentPage
      activePath="/donate"
      eyebrow="Acknowledgement"
      title={<>Donation payments are <em>not active.</em></>}
      description="This page is not a receipt or payment confirmation. No donation can be completed through this website."
    >
      <PageSection eyebrow="Payment status" title={<>No payment was made through this page.</>}>
        <p>
          This website does not process live donations, and no payment link is
          active. Reaching this page does not verify or acknowledge a payment.
        </p>
        <p>
          Do not share payment details here. Please wait for official,
          independently verified donation instructions and tax information.
        </p>
      </PageSection>
    </ContentPage>
  );
}
