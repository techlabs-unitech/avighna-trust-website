import type { Metadata } from "next";
import { ContentPage, NotePanel, PageSection } from "../_components/content-page";

export const metadata: Metadata = {
  title: "Donation & Refund Policy | Vedavani Pathashala",
  description:
    "A provisional donation and refund policy for a website that does not yet process live payments.",
};

export default function DonationRefundPolicyPage() {
  return (
    <ContentPage
      activePath="/donation-refund-policy"
      eyebrow="Donation & refund policy"
      title={<>Careful giving, <em>clear process.</em></>}
      description="This policy provides a provisional statement for donation-related communications while the institution confirms its live payment arrangements."
    >
      <PageSection eyebrow="Donations" title={<>Support should be informed and voluntary.</>}>
        <p>
          Donors are encouraged to confirm the purpose, current priorities and
          the legitimacy of any donation channels before making a contribution.
          At present, this site does not process live payments and does not
          provide bank, UPI or online payment details.
        </p>
        <p>
          Any receipt or acknowledgement should be provided only through the
          institution&apos;s official and independently verified donation process.
        </p>
      </PageSection>

      <PageSection eyebrow="Refunds" title={<>No refund process has yet been confirmed.</>}>
        <p>
          Since no live payment channel is currently active, no formal refund
          procedure is being advertised here. If future payment services are
          introduced, refund terms should be published with the official
          payment platform and reviewed by the institution.
        </p>
        <p>
          Until then, any contribution should be made only after confirming the
          target purpose and the authenticity of the payment link or channel.
        </p>
      </PageSection>
      <PageSection eyebrow="Acknowledgements & tax" title={<>Confirm details before any future contribution.</>}>
        <p>
          Any future acknowledgement, receipt, cancellation or refund request
          process must be published after the Trust has confirmed its
          procedures and payment provider arrangements. No receipt or
          tax-benefit eligibility is promised on this site.
        </p>
        <NotePanel title="Registration and tax information not verified">
          <p>
            No registration number, 12A or 80G status, deduction eligibility or
            refund guarantee has been supplied. The Trust should add and verify
            those details, along with an approved refund contact and process,
            before accepting donations.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
