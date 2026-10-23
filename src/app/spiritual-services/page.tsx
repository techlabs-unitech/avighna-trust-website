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
  title: "Spiritual Services | Vedavani Pathashala",
  description:
    "Learn about the institution's stated areas of temple service and spiritual activity.",
};

export default function SpiritualServicesPage() {
  return (
    <ContentPage
      activePath="/spiritual-services"
      eyebrow="Spiritual services"
      title={<>Tradition expressed <em>through service.</em></>}
      description="Temple services and spiritual activities are among the areas of work identified for the institution."
    >
      <PageSection eyebrow="Service & practice" title={<>A place for thoughtful participation.</>}>
        <p>
          Spiritual traditions are sustained through learning, practice and
          service. The supplied brief identifies temple services and spiritual
          activities as part of the institution&apos;s work.
        </p>
        <p>
          This page is an introduction to those areas, not a list of specific
          rituals, ceremonies or services. Details should be shared only when
          confirmed by the institution.
        </p>
      </PageSection>

      <PageSection eyebrow="Areas identified" title={<>Grounded in the brief.</>}>
        <InfoGrid
          items={[
            {
              title: "Homams & Yagnas",
              description:
                "Vedic fire rites and sacrificial observances are named as areas of spiritual activity; no specific rite or service is currently scheduled here.",
            },
            {
              title: "Pujas & Samskaras",
              description:
                "Worship and life-cycle rites are included in the stated scope, subject to confirmation of the tradition, arrangements and availability.",
            },
            {
              title: "Festivals",
              description:
                "Festivals can bring worship, learning and community together. No festival dates or programmes have been verified.",
            },
            {
              title: "Temple activities",
              description:
                "Temple-related activities are identified as part of the vision. Their location, form and public access require confirmation.",
            },
          ]}
        />
        <NotePanel title="Please enquire before making plans">
          <p>
            No temple address, service timetable, ritual details or contact
            person has been supplied. Please wait for verified information
            before planning a visit or requesting a service.
          </p>
        </NotePanel>
      </PageSection>

      <PageSection eyebrow="Approach" title={<>Learning and reverence together.</>}>
        <TextColumns>
          <TextBlock title="Rooted in understanding">
            <p>
              Engagement with spiritual practice can be enriched by learning
              about the knowledge traditions and values that shape it.
            </p>
          </TextBlock>
          <TextBlock title="Shared with respect">
            <p>
              Every service and activity should be represented accurately and
              approached with respect for the tradition and the people who
              sustain it.
            </p>
          </TextBlock>
        </TextColumns>
      </PageSection>
    </ContentPage>
  );
}
