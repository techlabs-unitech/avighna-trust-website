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
  title: "Research & Publications | Vedavani Pathashala",
  description:
    "An overview of research and publication areas connected with Vedic and Bharatiya knowledge traditions.",
};

export default function ResearchPage() {
  return (
    <ContentPage
      activePath="/research"
      eyebrow="Research & publications"
      title={<>Study deeply. <em>Share with care.</em></>}
      description="Research and publications can help preserve knowledge, support continued learning and invite thoughtful engagement with India's intellectual heritage."
    >
      <PageSection eyebrow="Areas of work" title={<>A careful record of learning.</>}>
        <p>
          Research and educational publications are identified as areas of work
          for the institution. Their purpose is to encourage study of Vedic and
          Bharatiya knowledge systems and make learning accessible to wider
          audiences.
        </p>
        <InfoGrid
          items={[
            {
              title: "Research Centre",
              description:
                "A research centre is identified in the project brief as part of the vision for study of Vedic and Bharatiya knowledge systems.",
              note: "No operational centre or current project has been verified.",
            },
            {
              title: "Manuscripts & texts",
              description:
                "Manuscripts and source texts are important to preservation and study; no collection or holdings are represented here.",
            },
            {
              title: "Physical library",
              description:
                "A library is included in the stated research and learning vision. No location, catalogue or operating hours have been supplied.",
            },
            {
              title: "Digital archives",
              description:
                "Digital preservation may support access to texts and learning resources, subject to permissions and the institution's plans.",
              note: "No digital collection or archive catalogue has been supplied.",
            },
            {
              title: "Publications",
              description:
                "Educational publications can share research and learning with care.",
              note: "No publication is currently available for download.",
            },
            {
              title: "Conferences & seminars",
              description:
                "Scholarly gatherings can support dialogue and exchange around Vedic and Bharatiya knowledge.",
              note: "No conference or seminar dates have been confirmed.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Responsible preservation" title={<>Knowledge held in trust.</>}>
        <TextColumns>
          <TextBlock title="Respect the source">
            <p>
              Preserving oral and written traditions calls for careful
              attribution, accurate representation and respect for the
              communities and lineages that sustain them.
            </p>
          </TextBlock>
          <TextBlock title="Share with purpose">
            <p>
              Publications and digital resources can connect learners with
              reliable material while creating space for further study,
              interpretation and dialogue.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Projects and resources">
          <p>
            No specific research project, publication, digital archive
            collection, conference or seminar has been verified for listing.
            These activities and any future resources should be confirmed by
            the institution.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
