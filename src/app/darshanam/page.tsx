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
  title: "Darśanam | Vedavani Pathashala",
  description:
    "A page introducing the role of darśanam, sacred seeing, and temple architecture in the broader vision of Vedavani Pathashala.",
};

export default function DarshanamPage() {
  return (
    <ContentPage
      activePath="/darshanam"
      eyebrow="Darśanam"
      title={<>Sacred seeing, <em>in context.</em></>}
      description="Darśanam includes the experience of sacred presence, ritual attention and the visual language of temple spaces and devotion."
    >
      <PageSection eyebrow="The experience" title={<>A living encounter with the sacred.</>}>
        <p>
          The term darśanam speaks of seeing and being seen by the sacred. In a
          temple setting, this experience is shaped not only by ritual but also
          by architecture, atmosphere, symbolism and the cultivated attention of
          the devotee.
        </p>
        <InfoGrid
          items={[
            {
              title: "Sacred pilgrimages",
              description:
                "Pilgrimage and temple visits are opportunities for learning and reflection; no itinerary or visit is currently advertised.",
            },
            {
              title: "Vāstu Śāstra",
              description:
                "Vāstu Śāstra offers a traditional lens for considering space, orientation and the principles associated with built environments.",
            },
            {
              title: "Āgama Śāstra",
              description:
                "Āgama Śāstra provides traditions of knowledge related to temple worship, ritual and sacred practice.",
            },
            {
              title: "Sacred geometry & symbolism",
              description:
                "Proportion, geometry and the symbolism of temple structures can shape how sacred architecture is understood.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Architecture & meaning" title={<>Form, symbolism and reverence.</>}>
        <TextColumns>
          <TextBlock title="Temple form">
            <p>
              Temple architecture can communicate sacred principles through
              proportion, geometry, direction, and visual emphasis.
            </p>
          </TextBlock>
          <TextBlock title="Shared devotion">
            <p>
              The experience of darśanam is also relational: a place where
              community, ritual continuity and reverence are carried forward in
              practical action.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Verification required">
          <p>
            No official temple address, architecture notes, ritual calendar or
            programme details have been verified. Any public information should
            be confirmed before publication.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
