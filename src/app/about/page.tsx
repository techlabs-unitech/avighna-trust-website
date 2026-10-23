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
  title: "About | Vedavani Pathashala",
  description:
    "Learn about the purpose, vision and educational philosophy behind Vedavani Pathashala and Avighna Trust.",
};

export default function AboutPage() {
  return (
    <ContentPage
      activePath="/about"
      eyebrow="About"
      title={<>A living inheritance, <em>carried forward.</em></>}
      description="An introduction to Vedic learning, the Guru-Shishya Parampara and an education rooted in Indian knowledge traditions."
    >
      <PageSection eyebrow="Who we are" title={<>Learning that honours its roots.</>}>
        <p>
          Vedavani Pathashala and Avighna Trust are presented here as provisional
          names for an institution focused on Vedic education, Sanskrit,
          spiritual heritage and community welfare. Their precise legal and
          institutional relationship has not yet been confirmed.
        </p>
        <p>
          The purpose described in this website is to preserve and share Vedic
          knowledge through attentive study, oral traditions, values-based
          learning and meaningful engagement with the present.
        </p>
        <NotePanel title="A provisional identity">
          <p>
            Official naming, organisational structure and the relationship
            between these names require confirmation before publication as
            formal institutional statements.
          </p>
        </NotePanel>
      </PageSection>

      <PageSection eyebrow="Our vision & mission" title={<>An enduring purpose.</>}>
        <InfoGrid
          items={[
            {
              title: "Vision",
              description:
                "Preserve and share the wisdom of the Vedas and Bharatiya traditions, nurturing generations grounded in understanding, humility and purpose.",
            },
            {
              title: "Mission",
              description:
                "Create space for sincere learning through Vedic studies, Sanskrit, the Guru-Shishya Parampara and holistic education.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="Educational philosophy" title={<>Knowledge, practice and character.</>}>
        <TextColumns>
          <TextBlock title="Learning through relationship">
            <p>
              The teacher-student tradition values listening, guidance, regular
              practice and the passing on of knowledge with care. It asks a
              learner not only to remember, but to reflect and grow.
            </p>
          </TextBlock>
          <TextBlock title="Tradition in dialogue with today">
            <p>
              Vedic and Sanskrit learning can sit alongside contemporary
              educational opportunities. The intention is to approach both
              with discernment, respect and an openness to lifelong learning.
            </p>
          </TextBlock>
        </TextColumns>
        <p>
          Vidyā dadāti vinayam: knowledge bestows humility. This principle
          offers a fitting guide for learning that values both understanding
          and the way one lives.
        </p>
      </PageSection>

      <PageSection eyebrow="Core values" title={<>Principles for learning and living.</>}>
        <InfoGrid
          items={[
            { title: "Dharma", description: "A commitment to right conduct, responsibility and care." },
            { title: "Satya", description: "Truthfulness in learning, speech and action." },
            { title: "Seva", description: "Service offered with humility and concern for others." },
            { title: "Vinaya", description: "Humility and respect in the pursuit and sharing of knowledge." },
            { title: "Shraddha", description: "Sincere attention, trust and dedication in learning." },
            { title: "Samskriti", description: "Respect for cultural inheritance and its thoughtful continuity." },
            { title: "Jnana", description: "Knowledge pursued with discernment and a willingness to reflect." },
            { title: "Karuna", description: "Compassion expressed through understanding and action." },
            { title: "Samatva", description: "Equanimity and respect for the dignity of all." },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="The Trust" title={<>A purpose held in trust.</>}>
        <TextColumns>
          <TextBlock title="Why Vedavani Pathashala?">
            <p>
              The name evokes learning carried through the spoken word. The
              Pathashala is presented here as a learning vision for Vedic
              knowledge, Sanskrit and holistic education; its formal
              institutional status and relationship to Avighna Trust need
              confirmation.
            </p>
          </TextBlock>
          <TextBlock title="Our commitment">
            <p>
              We aim to represent traditions with respect, share only verified
              programme and organisational information, and keep learning
              connected to values, service and the wider community.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Institutional details require confirmation">
          <p>
            Registration, governance, official naming and the relationship
            between Avighna Trust and Vedavani Pathashala must be reviewed by
            the Trust before these statements are treated as formal facts.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
