import type { Metadata } from "next";
import { ContentPage, NotePanel, PageSection } from "../_components/content-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Vedavani Pathashala",
  description:
    "A provisional privacy policy describing how the organisation may handle visitor and enquiry information on this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <ContentPage
      activePath="/privacy-policy"
      eyebrow="Privacy policy"
      title={<>Respecting trust, <em>and personal information.</em></>}
      description="This policy is a provisional statement describing how contact and enquiry information may be managed in a careful, limited way on this website."
    >
      <PageSection eyebrow="Information we may collect" title={<>A limited and purpose-based approach.</>}>
        <p>
          The website may collect information that visitors choose to provide in
          contact, enquiry and registration forms, including names, email
          addresses and general enquiry details. This information is used to
          respond to questions, handle interest in programmes or volunteering,
          and maintain appropriate records.
        </p>
        <p>
          Personal information is not sold or shared with unrelated third
          parties. It is kept to the minimum needed for the stated purpose and
          is stored with reasonable care.
        </p>
      </PageSection>

      <PageSection eyebrow="How information is used" title={<>Only for the purpose it was given.</>}>
        <p>
          We use details such as name and contact information only to respond to
          enquiries, coordinate participation, share updates that a visitor has
          specifically requested, or maintain internal records for operational
          purposes as appropriate.
        </p>
        <p>
          Any future operational handling of personal data should align with the
          institution&apos;s final policy, legal requirements and the services used
          to manage communications.
        </p>
      </PageSection>
      <PageSection eyebrow="Storage, donations & your choices" title={<>Clear practices still need Trust review.</>}>
        <p>
          Enquiry submissions may include names, email addresses, phone numbers
          and the message a visitor chooses to send. The website currently has
          no live donation or payment flow and does not request card details,
          bank credentials or payment PINs.
        </p>
        <p>
          The final policy should identify the responsible data controller,
          retention periods, service providers, contact for privacy requests,
          applicable legal basis and procedures for access, correction and
          deletion. Those details have not been confirmed here.
        </p>
        <NotePanel title="Provisional template — Trust and legal review required">
          <p>
            This page is not legal advice or an approved privacy notice. Confirm
            the Trust&apos;s actual data handling, hosting and retention practices
            before publication or collection of personal information.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
