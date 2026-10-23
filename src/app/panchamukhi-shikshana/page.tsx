import type { Metadata } from "next";
import {
  ContentPage,
  PageSection,
  TextBlock,
  TextColumns,
} from "../_components/content-page";
import { FivePillars } from "../_components/pillars";

export const metadata: Metadata = {
  title: "Panchamukhi Shikshana | Vedavani Pathashala",
  description:
    "An introduction to Panchamukhi Shikshana as a multidimensional educational approach rooted in Bharatiya learning traditions.",
};

export default function PanchamukhiShikshanaPage() {
  return (
    <ContentPage
      activePath="/panchamukhi-shikshana"
      eyebrow="Panchamukhi Shikshana"
      title={<>Five dimensions. <em>One whole education.</em></>}
      description="A five-pronged education system combining Veda, Yoga, Vijnana, Krishi and Kala Kaushalya for all-round personality development."
    >
      <FivePillars />

      <PageSection eyebrow="Why it matters" title={<>Education with depth and direction.</>}>
        <TextColumns>
          <TextBlock title="Learning that forms character">
            <p>
              A good educational framework does not only cultivate information.
              It also shapes how a person listens, reflects, responds and acts.
            </p>
          </TextBlock>
          <TextBlock title="Tradition with relevance">
            <p>
              The value of Bharatiya educational thought lies in its ability to
              connect continuity with contemporary life: honouring roots while
              supporting thoughtful growth in the present.
            </p>
          </TextBlock>
        </TextColumns>
      </PageSection>
    </ContentPage>
  );
}
