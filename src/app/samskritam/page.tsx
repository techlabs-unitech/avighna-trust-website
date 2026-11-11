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
  title: "Samskritam | Vedavani Pathashala",
  description:
    "Explore the place of Sanskrit and Vedic heritage in the educational and cultural life of Vedavani Pathashala.",
};

export default function SamskritamPage() {
  return (
    <ContentPage
      activePath="/samskritam"
      eyebrow="Samskritam"
      title={<>Language, heritage, <em>and living memory.</em></>}
      description="Sanskrit is treated here as a living language of learning, literature, ritual memory and cultural continuity."
    >
      <PageSection eyebrow="The language of tradition" title={<>A study of words, meanings and memory.</>}>
        <p>
          Sanskrit remains central to the study of Vedic and Bharatiya
          knowledge traditions. It provides access to texts, meanings, ideas,
          recitation and a vast intellectual heritage that continues to shape
          learning today.
        </p>
        <InfoGrid
          items={[
            {
              title: "Language learning",
              description:
                "Developing fluency and confidence through grammar, vocabulary and the study of classical usage.",
            },
            {
              title: "Textual heritage",
              description:
                "Reading the Vedas, Upanishads, epics and other works in their cultural and philosophical context.",
            },
            {
              title: "Recitation & sound",
              description:
                "Honouring the oral tradition in which sound, memory and correct transmission are central.",
            },
            {
              title: "Cultural continuity",
              description:
                "Connecting the language of heritage to the life of the community, learning and practice.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Vedic heritage" title={<>A heritage that speaks across generations.</>}>
        <TextColumns>
          <TextBlock title="Listening and study">
            <p>
              Vedic learning emphasises careful listening, recitation and
              carrying teaching forward with accuracy and reverence.
            </p>
          </TextBlock>
          <TextBlock title="A living tradition">
            <p>
              Sanskrit is not only a classical language; it can also become a
              means of understanding inherited ideas, daily practice and the
              deeper values of cultural life.
            </p>
          </TextBlock>
        </TextColumns>
        <InfoGrid
          items={[
            {
              title: "DevaVāṇī",
              description:
                "DevaVāṇī is named in the project brief as a Sanskrit learning programme, connecting language study with cultural and textual heritage.",
              note: "Current classes, levels and schedules are not confirmed.",
            },
            {
              title: "Sanskrit activities",
              description:
                "Language practice, recitation and engagement with Sanskrit texts are described as areas of interest.",
              note: "No particular activity or session is advertised as currently available.",
            },
          ]}
        />
        <NotePanel title="Program details">
          <p>
            Any specific teaching modules, schedules or assessment pathways must
            be confirmed directly with the institution before they are treated
            as official course information.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
