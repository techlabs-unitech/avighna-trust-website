import type { Metadata } from "next";
import { ContentPage, NotePanel, PageSection } from "../_components/content-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Vedavani Pathashala",
  description:
    "A provisional set of website terms covering general use of the site and the institution's public information.",
};

export default function TermsAndConditionsPage() {
  return (
    <ContentPage
      activePath="/terms-and-conditions"
      eyebrow="Terms & conditions"
      title={<>A clear framework for <em>responsible use.</em></>}
      description="These terms form a general statement governing public use of the website and the information it presents."
    >
      <PageSection eyebrow="Use of this website" title={<>Content is provided for information.</>}>
        <p>
          The information on this website is intended to provide general public
          information about the mission, learning approach and activities of
          Avighna Trust and Vedavani Pathashala. It should be read as an
          informational resource, not as a final legal, academic, or operational
          statement of every institutional decision.
        </p>
        <p>
          Efforts are made to keep the material accurate and respectful. However,
          details may change as official arrangements are confirmed, and the
          institution should be consulted before relying on any specific claim.
        </p>
      </PageSection>

      <PageSection eyebrow="Responsible use" title={<>Please treat all content with care.</>}>
        <p>
          Users should not infer official programme details, contact information,
          tax status, legal rulings, or financial arrangements from this website
          without independently verified confirmation from the institution.
        </p>
        <p>
          We reserve the right to revise text, navigation and informational
          content as official arrangements and publications become available.
        </p>
      </PageSection>
      <PageSection eyebrow="Visitor responsibilities" title={<>Use the site respectfully.</>}>
        <p>
          Visitors should provide accurate information when using enquiry
          forms, avoid submitting sensitive financial credentials, and not
          interfere with the site or attempt unauthorised access. Website
          content may not be republished in a misleading way or used to imply
          an official relationship or endorsement that has not been confirmed.
        </p>
        <p>
          The final terms should identify the responsible legal entity,
          governing law, intellectual-property permissions and formal process
          for notices. These matters remain subject to Trust confirmation and
          legal review.
        </p>
        <NotePanel title="Provisional terms — review required">
          <p>
            This is a general website-use template, not a legal agreement or
            legal advice. The Trust should approve the terms and complete all
            jurisdiction-specific details before launch.
          </p>
        </NotePanel>
      </PageSection>
    </ContentPage>
  );
}
