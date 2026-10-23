import type { Metadata } from "next";
import {
  ContentPage,
  NotePanel,
  PageSection,
} from "../_components/content-page";
import { GalleryExplorer } from "../_components/gallery-explorer";

export const metadata: Metadata = {
  title: "Gallery | Vedavani Pathashala",
  description:
    "A gallery structure prepared for approved institutional photographs; current visuals are clearly marked placeholders.",
};

export default function GalleryPage() {
  return (
    <ContentPage
      activePath="/gallery"
      eyebrow="Gallery"
      title={<>Tradition, <em>in the making.</em></>}
      description="A place for the people, practice and moments of this learning community—once approved institutional photographs are available."
    >
      <PageSection eyebrow="A visual record" title={<>Our gallery is waiting for its stories.</>}>
        <p>
          No official campus, student or activity photographs were present in
          the project assets. The panels below are intentionally abstract
          placeholders, not images of the institution or its community.
        </p>
        <GalleryExplorer />
        <NotePanel title="Photography and permissions">
          <p>
            Approved photographs can replace these placeholders when supplied.
            Images featuring students or community members should be shared
            only with appropriate permission and context.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
