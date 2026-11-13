import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  NotePanel,
  PageSection,
} from "../_components/content-page";
import { SubmissionForm } from "../_components/submission-form";

export const metadata: Metadata = {
  title: "Volunteers · स्वयंसेवकाः | Avighna Trust",
  description:
    "Learn about ways to contribute, and review the volunteer registration form prepared for future institutional use.",
};

export default function VolunteerPage() {
  return (
    <ContentPage
      activePath="/volunteers"
      eyebrow="Volunteers · स्वयंसेवकाः"
      title={<>Offer your time, <em>with sincerity.</em></>}
      description="Volunteering can support learning, community outreach, cultural programmes and service, subject to verified institutional needs and arrangements."
    >
      <PageSection eyebrow="Ways to contribute" title={<>Where you can help.</>}>
        <p>
          Selfless service is one of our guiding values. Whatever your skill, there is a place for it in the work of the Trust.
        </p>
        <InfoGrid
          items={[
            { title: "Teaching", description: "Share your knowledge with the students of the Pathashala." },
            { title: "Sanskrit promotion", description: "Help more people discover and speak the language of our heritage." },
            { title: "Temple services", description: "Assist with the daily worship and temple arrangements." },
            { title: "Event management", description: "Help organise festivals, pilgrimages and conferences." },
            { title: "Farming", description: "Lend a hand with the organic farming and the goshala." },
            { title: "Library care", description: "Help look after the library and its collection." },
            { title: "IT & website support", description: "Offer technical skills to the Trust’s digital work." },
            { title: "Media / photography", description: "Capture and share the life of the Trust with care." },
            { title: "Community outreach", description: "Take the Trust’s work out to villages and neighbourhoods." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Registration interest" title={<>Tell us about your interest.</>}>
        <SubmissionForm type="volunteer" />
        <NotePanel title="Important note">
          <p>
            Submitting this form expresses interest only. The site does not
            confirm a volunteer opportunity, response time or email receipt.
            Submission availability depends on configured Supabase and abuse
            protection services.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
