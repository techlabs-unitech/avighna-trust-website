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
  title: "Vanaprastham | Vedavani Pathashala",
  description:
    "A reflective introduction to the Vanaprastham principle and the role of elder wisdom, learning and service in a Vedic life cycle.",
};

export default function VanaprasthamPage() {
  return (
    <ContentPage
      activePath="/vanaprastham"
      eyebrow="Vanaprastham"
      title={<>A life of reflection, <em>service and wisdom.</em></>}
      description="Vanaprastham is included as a reflective stage of life and learning, highlighting wisdom, community and a continuing ethical purpose."
    >
      <PageSection eyebrow="The stage of life" title={<>A later stage shaped by experience.</>}>
        <p>
          In the broader frame of Bharatiya life and thought, Vanaprastham
          carries a sense of withdrawal from the busyness of worldly striving
          and a deeper turn toward contemplation, service, and transmission of
          wisdom.
        </p>
        <InfoGrid
          items={[
            {
              title: "Reflective learning",
              description:
                "A period in which experience becomes a source of understanding, humility and maturity.",
            },
            {
              title: "Guidance",
              description:
                "Sharing insight and values with younger generations, while continuing to learn with openness.",
            },
            {
              title: "Service",
              description:
                "Applying insight in service to family, community and the broader cultural inheritance.",
            },
            {
              title: "Inner steadiness",
              description:
                "The role of wisdom, discernment and calm character in a life shaped by purpose.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="A broader vision" title={<>Wisdom as a living inheritance.</>}>
        <TextColumns>
          <TextBlock title="The value of maturity">
            <p>
              A mature life of learning is not only about scholarship. It is
              also about patience, integrity, and the willingness to guide with
              care.
            </p>
          </TextBlock>
          <TextBlock title="Continuing contribution">
            <p>
              Community, education and spiritual service can all receive strength
              from elders who continue to contribute with wisdom and humility.
            </p>
          </TextBlock>
        </TextColumns>
        <NotePanel title="Current programmes">
          <p>
            No specific Vanaprastham programme, eligibility statement or public
            schedule has been confirmed by the institution. Any public offering
            should be treated as provisional until verified.
          </p>
        </NotePanel>
      </PageSection>
      <PageSection eyebrow="A reflective way of life" title={<>Daily practice, community and well-being.</>}>
        <InfoGrid
          items={[
            {
              title: "Daily routine",
              description: "A considered rhythm may hold space for reflection, learning, rest and purposeful activity.",
            },
            {
              title: "Mentorship",
              description: "The sharing of experience and guidance can support learning across generations.",
            },
            {
              title: "Community life",
              description: "Meaningful participation can connect personal reflection with mutual care and service.",
            },
            {
              title: "Holistic well-being",
              description: "A balanced approach recognises physical, emotional, intellectual and spiritual dimensions of life.",
            },
          ]}
        />
        <NotePanel title="A principle, not a confirmed residential service">
          <p>
            This page describes a reflective concept. No residential facility,
            location, medical service or active Vanaprastham programme has been
            confirmed.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
