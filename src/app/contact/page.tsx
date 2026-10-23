import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  NotePanel,
  PageSection,
} from "../_components/content-page";
import { SubmissionForm } from "../_components/submission-form";

export const metadata: Metadata = {
  title: "Contact | Vedavani Pathashala",
  description:
    "Contact and visit information for Vedavani Pathashala will be published when verified details are supplied.",
};

export default function ContactPage() {
  return (
    <ContentPage
      activePath="/contact"
      eyebrow="Contact"
      title={<>Begin with a <em>conversation.</em></>}
      description="We welcome enquiries about learning and the institution. Verified contact and visiting information is not yet available."
    >
      <PageSection eyebrow="Enquiries & visits" title={<>Details to be confirmed.</>}>
        <p>
          Official phone, email and postal contact details have not been
          provided. You can submit an enquiry using the form below; responses
          and email notifications are not yet configured.
        </p>
        <InfoGrid
          items={[
            {
              title: "Email & phone",
              description:
                "Official email address and telephone number have not been supplied.",
            },
            {
              title: "Location & directions",
              description:
                "No verified institutional or visiting address has been supplied.",
            },
            {
              title: "Visiting hours",
              description:
                "Visiting hours and visitor arrangements have not been confirmed.",
            },
            {
              title: "Enquiry options",
              description:
                "Use the enquiry form below. A response time or email receipt is not guaranteed.",
            },
          ]}
        />
        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Send an enquiry</h3>
        <SubmissionForm type="contact" />
        <p style={{ marginTop: "1rem" }}>
          Submission availability depends on configured Supabase and abuse
          protection services. Do not include sensitive personal information.
        </p>
        <NotePanel title="Before planning a visit">
          <p>
            Please wait for confirmed location, directions and visiting
            arrangements. No physical address or travel directions should be
            inferred from this page.
          </p>
        </NotePanel>
      </PageSection>
      <PageSection eyebrow="Programme interest" title={<>Ask about admissions.</>}>
        <p>
          This form records an enquiry only when submission services are
          configured. It does not confirm admission, course availability,
          eligibility, fees or a response time.
        </p>
        <SubmissionForm type="admission" />
      </PageSection>
    </ContentPage>
  );
}
