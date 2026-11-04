import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  NotePanel,
  PageSection,
  TextBlock,
  TextColumns,
} from "../_components/content-page";
import { EventsCalendar } from "../_components/events-calendar";
import { SubmissionForm } from "../_components/submission-form";

export const metadata: Metadata = {
  title: "Events & Activities | Vedavani Pathashala",
  description:
    "An overview of activity areas associated with Vedic learning and community, with no unverified dates or event listings.",
};

export default function EventsPage() {
  return (
    <ContentPage
      activePath="/events"
      eyebrow="Events & activities"
      title={<>Gathering in good <em>purpose.</em></>}
      description="Learning, spiritual activity and community service can bring people together around a shared cultural inheritance."
    >
      <PageSection eyebrow="Activity areas" title={<>A space for what comes next.</>}>
        <p>
          The areas below reflect the institution&apos;s stated interests and
          learning themes. They are not announcements of scheduled events.
          Details will appear here only when dates and arrangements are
          confirmed by the institution.
        </p>
        <InfoGrid
          items={[
            {
              title: "Vedic learning",
              description:
                "Study and oral traditions are central to the educational purpose described in the brief.",
              note: "No public session dates confirmed.",
            },
            {
              title: "Sanskrit & texts",
              description:
                "Language and Bharatiya texts offer opportunities for shared learning and reflection.",
              note: "No class or gathering dates confirmed.",
            },
            {
              title: "Spiritual activities",
              description:
                "Spiritual activities are an identified area of work; specific formats and schedules require confirmation.",
              note: "No service dates confirmed.",
            },
            {
              title: "Community service",
              description:
                "Community welfare and outreach are part of the stated purpose.",
              note: "No current activity dates confirmed.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Event information" title={<>Verified details will be shared here.</>}>
        <EventsCalendar />
        <TextColumns>
          <TextBlock title="No calendar yet">
            <p>
              No dated event, registration link, venue or scheduled activity
              has been supplied. This page will be updated when verified
              information is available.
            </p>
          </TextBlock>
          <TextBlock title="Stay connected">
            <p>
              For enquiries about possible activities, use the contact page.
              Official contact details are still to be provided.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Please note">
          <p>
            The themes on this page describe areas of interest only. They
            should not be interpreted as confirmation that an event is
            scheduled or open for registration.
          </p>
        </NotePanel>
      </PageSection>
      <PageSection eyebrow="Future activities" title={<>Express interest without registering.</>}>
        <p>
          There are no confirmed events or open registrations at this time.
          You may send a general enquiry about future activities; this does not
          reserve a place or register you for an event.
        </p>
        <SubmissionForm type="contact" />
      </PageSection>
    </ContentPage>
  );
}
