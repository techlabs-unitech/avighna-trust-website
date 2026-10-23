import type { Metadata } from "next";
import {
  ContentPage,
  InfoGrid,
  NotePanel,
  PageSection,
  TextBlock,
  TextColumns,
} from "../_components/content-page";

export const metadata: Metadata = {
  title: "Community | Vedavani Pathashala",
  description:
    "Learn about the community welfare and outreach purpose described for the institution.",
};

export default function CommunityPage() {
  return (
    <ContentPage
      activePath="/community"
      eyebrow="Community"
      title={<>Knowledge in the service <em>of community.</em></>}
      description="Community welfare is part of the stated institutional purpose: learning and service held together with care."
    >
      <PageSection eyebrow="Community welfare" title={<>A wider circle of care.</>}>
        <p>
          The supplied brief includes community welfare and outreach among the
          institution&apos;s areas of work. This reflects a view of education that
          reaches beyond individual study and recognises responsibility to the
          wider community.
        </p>
        <p>
          Specific initiatives, beneficiaries, locations and schedules have
          not been supplied. We will describe activities here only after their
          details are verified.
        </p>
      </PageSection>

      <PageSection eyebrow="Learning and outreach" title={<>Programmes named in the project brief.</>}>
        <InfoGrid
          items={[
            {
              title: "Deva Śruti Veda classes",
              description:
                "Veda classes are identified as a community learning area under the name Deva Śruti.",
              note: "Class availability and schedule are not confirmed.",
            },
            {
              title: "DevaVāṇī Sanskrit classes",
              description:
                "Sanskrit classes are identified as an outreach area under the name DevaVāṇī.",
              note: "Class availability and schedule are not confirmed.",
            },
            {
              title: "Cultural festivals & workshops",
              description:
                "Cultural gatherings and workshops can create opportunities for shared learning and participation.",
              note: "No current dates or registration details have been supplied.",
            },
            {
              title: "Youth programmes & teacher training",
              description:
                "Youth learning and teacher development are named as areas of community engagement.",
              note: "No current programme details have been verified.",
            },
            {
              title: "Rural outreach",
              description:
                "Rural outreach is included in the stated scope of community work.",
              note: "No location, partner or active initiative has been confirmed.",
            },
            {
              title: "Community service",
              description:
                "Seva connects learning with responsibility and care for the wider community.",
              note: "Specific beneficiaries and activities require confirmation.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="A considered commitment" title={<>Service shaped by real needs.</>}>
        <TextColumns>
          <TextBlock title="Listen first">
            <p>
              Meaningful outreach begins by listening and understanding the
              needs of the people and communities involved.
            </p>
          </TextBlock>
          <TextBlock title="Share verified work">
            <p>
              Clear information about activities helps supporters understand
              what is being done without overstating impact or inventing
              achievements.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Current initiatives">
          <p>
            No named welfare project, outcome, partner organisation or
            beneficiary information has been provided. This page does not
            claim that a specific initiative is currently underway.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
