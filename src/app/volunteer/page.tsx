import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  NotePanel,
  PageSection,
} from "../_components/content-page";
import { SubmissionForm } from "../_components/submission-form";

export const metadata: Metadata = {
  title: "Volunteer Registration | Vedavani Pathashala",
  description:
    "Learn about ways to contribute, and review the volunteer registration form prepared for future institutional use.",
};

export default function VolunteerPage() {
  return (
    <ContentPage
      activePath="/volunteer"
      eyebrow="Volunteer registration"
      title={<>Offer your time, <em>with sincerity.</em></>}
      description="Volunteering can support learning, community outreach, cultural programmes and service, subject to verified institutional needs and arrangements."
    >
      <PageSection eyebrow="Ways to contribute" title={<>A good intention deserves a clear process.</>}>
        <p>
          The institution has identified community service and outreach as
          important areas of work. Volunteer support may help with education,
          temple or cultural activity, community engagement and administrative
          support as opportunities are confirmed.
        </p>
        <InfoGrid
          items={[
            {
              title: "Teaching",
              description:
                "Support learning opportunities when a suitable teaching role is confirmed.",
            },
            {
              title: "Sanskrit promotion",
              description:
                "Contribute to activities that encourage Sanskrit learning and cultural continuity.",
            },
            {
              title: "Temple services",
              description:
                "Assist with temple services when arrangements and needs are confirmed.",
            },
            {
              title: "Events",
              description:
                "Help with event preparation and coordination if future opportunities are announced.",
            },
            {
              title: "Farming",
              description:
                "Offer practical support in farming-related activities if requested by the institution.",
            },
            {
              title: "Library",
              description:
                "Support library-related work if a collection and volunteer need are confirmed.",
            },
            {
              title: "Publications",
              description:
                "Assist with publication activities when specific projects and roles are confirmed.",
            },
            {
              title: "IT",
              description:
                "Contribute relevant technical skills to support the institution's work when requested.",
            },
            {
              title: "Media",
              description:
                "Support communications or media work with accurate, approved content.",
            },
            {
              title: "Outreach",
              description:
                "Contribute to outreach efforts when locations, partners and needs are verified.",
            },
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
