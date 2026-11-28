import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  PageSection,
} from "../_components/content-page";
import { SubmissionForm } from "../_components/submission-form";

export const metadata: Metadata = {
  title: "Contact · सम्पर्कः | Avighna Trust",
  description:
    "Write to the Trust office, or visit during temple and office hours.",
};

export default function ContactPage() {
  return (
    <ContentPage
      activePath="/contact"
      eyebrow="Contact · सम्पर्कः"
      title={<>Begin with a <em>conversation.</em></>}
      description="Write to the Trust office about rituals, pilgrimages, giving, the Pathashala, Vṛddhāśrama or volunteering. Visitors are welcome during office hours."
    >
      <PageSection eyebrow="Enquiries & visits" title={<>Office hours & enquiries.</>}>
        <p>
          Please use the form below and the Trust office will respond. Our postal address, phone numbers, email and map will be shown here.
        </p>
        <InfoGrid
          items={[
            { title: "Office", description: "Monday – Saturday, 9:00 AM – 5:30 PM." },
            { title: "Admission enquiry", description: "Ask about the Vedavāṇī Pāṭhaśālā using the admission form further down this page." },
            { title: "Volunteer registration", description: "Offer your time through the Volunteers page.", note: "Volunteers" },
          ]}
        />
        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>Send an enquiry</h3>
        <SubmissionForm type="contact" />
      </PageSection>
      <PageSection eyebrow="Pāṭhaśālā" title={<>Admission enquiry.</>}>
        <p>
          Tell us about the student and what you would like to know about admission to the Vedavāṇī Pāṭhaśālā.
        </p>
        <SubmissionForm type="admission" />
      </PageSection>
    </ContentPage>
  );
}
