import type { Metadata } from "next";
import { ContentPage, PageSection } from "../_components/content-page";
import { TestimonialsGallery } from "../_components/testimonials-gallery";
import { testimonials } from "./data";

export const metadata: Metadata = {
  title: "Testimonials | Vedavani Pathashala",
  description:
    "Videos, photographs and words from parents, students, volunteers and well-wishers of Vedavani Pathashala.",
};

export default function TestimonialsPage() {
  return (
    <ContentPage
      activePath="/testimonials"
      eyebrow="Testimonials"
      title={<>Voices from our <em>community.</em></>}
      description="Videos, photographs and heartfelt words from the parents, students, volunteers and well-wishers who walk with us."
    >
      <PageSection eyebrow="In their words" title={<>Stories that speak for us.</>}>
        <p>
          Watch and read how the Pathashala has touched the lives of the
          people connected with it.
        </p>
        <TestimonialsGallery items={testimonials} />
      </PageSection>
    </ContentPage>
  );
}
