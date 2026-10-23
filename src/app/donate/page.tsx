import type { Metadata } from "next";
import {
  ContentPage,
  NotePanel,
  PageSection,
} from "../_components/content-page";
import { DonationSelector } from "../_components/donation-selector";

export const metadata: Metadata = {
  title: "Support the Mission | Vedavani Pathashala",
  description:
    "Learn about the documented purposes that support may contribute to. Verified donation channels are not yet available.",
};

export default function DonatePage() {
  return (
    <ContentPage
      activePath="/donate"
      eyebrow="Dharmakaryam"
      title={<>Help keep the lamp <em>of learning lit.</em></>}
      description="Support for education, knowledge preservation, spiritual activity and community welfare can help carry this purpose forward."
    >
      <PageSection eyebrow="Purposes described" title={<>Support aligned with the work.</>}>
        <p>
          The brief identifies Vedic and Sanskrit education, research,
          publications, temple services, spiritual activities and community
          welfare as areas of institutional work. These are the purposes
          described here; current funding priorities have not been supplied.
        </p>
        <p>
          The categories below are presented for interface planning only. They
          do not represent confirmed funding priorities or active donation
          arrangements.
        </p>
        <DonationSelector />
      </PageSection>

      <PageSection eyebrow="Before contributing" title={<>Verified information comes first.</>}>
        <p>
          No bank account, UPI ID, payment link or donation-processing
          arrangement has been verified. This site does not currently accept
          contributions or collect donor or payment information.
        </p>
        <NotePanel title="No tax-benefit claim">
          <p>
            Registration, tax-exemption status and any 80G eligibility have
            not been verified. No tax deduction or receipt should be assumed
            from this page.
          </p>
        </NotePanel>
        <p>
          Please wait for official, independently verifiable donation
          instructions and confirmation of current priorities before making
          any contribution.
        </p>
      </PageSection>
    </ContentPage>
  );
}
