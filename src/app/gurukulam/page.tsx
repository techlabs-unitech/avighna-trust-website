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
  title: "Gurukulam | Vedavani Pathashala",
  description:
    "Explore the Gurukulam tradition, the Guru-Shishya Parampara and a holistic approach to learning.",
};

export default function GurukulamPage() {
  return (
    <ContentPage
      activePath="/gurukulam"
      eyebrow="Gurukulam"
      title={<>A way of learning. <em>A way of living.</em></>}
      description="The Gurukulam tradition brings study, discipline, reflection and the teacher-student relationship into a connected learning journey."
    >
      <PageSection eyebrow="The learning relationship" title={<>Guru and shishya, learning together.</>}>
        <p>
          In the Guru-Shishya Parampara, knowledge is shared through attentive
          teaching and engaged learning. Listening, recitation, questions and
          sustained practice help a learner develop understanding as well as
          humility.
        </p>
        <p>
          The tradition is not simply a method of instruction. It places
          learning within a relationship of guidance, responsibility and
          respect, and keeps knowledge connected to how it is practised and
          passed on.
        </p>
      </PageSection>

      <PageSection eyebrow="A considered approach" title={<>Learning in many dimensions.</>}>
        <InfoGrid
          items={[
            {
              title: "Śravaṇa",
              description:
                "Listening closely to teaching and oral recitation as a foundation for study.",
            },
            {
              title: "Abhyāsa",
              description:
                "Returning to learning through regular practice, care and attention.",
            },
            {
              title: "Manana",
              description:
                "Making room to reflect, ask thoughtful questions and deepen understanding.",
            },
            {
              title: "Ācāra",
              description:
                "Nurturing values, discipline and conduct alongside the pursuit of knowledge.",
            },
          ]}
        />
      </PageSection>

      <PageSection eyebrow="A daily rhythm" title={<>Study, practice and reflection.</>}>
        <InfoGrid
          items={[
            {
              title: "Begin with attention",
              description: "A day in a Gurukulam may make space for quiet preparation, reflection and readiness to learn.",
            },
            {
              title: "Learn with guidance",
              description: "Teaching, listening, recitation and questions form a connected learning practice.",
            },
            {
              title: "Practise and participate",
              description: "Steady practice and shared responsibilities can connect study with everyday conduct.",
            },
            {
              title: "Reflect and rest",
              description: "Time for reflection, community and rest supports a balanced approach to learning.",
            },
          ]}
        />
        <NotePanel title="Illustrative learning rhythm, not a confirmed timetable">
          <p>
            These are broad learning themes, not a description of an operating
            daily schedule. Timings, residential arrangements, student life and
            specific practices have not been supplied and must be confirmed
            with the institution.
          </p>
        </NotePanel>
      </PageSection>

      <PageSection eyebrow="Tradition in daily life" title={<>Practice with purpose.</>}>
        <TextColumns>
          <TextBlock title="Oral traditions">
            <p>
              Vedic learning honours careful listening, accurate recitation
              and continuity between teacher and student. The practice of
              preserving knowledge orally is central to this inheritance.
            </p>
          </TextBlock>
          <TextBlock title="Holistic education">
            <p>
              Yoga, traditional arts, Sanskrit and reflective study can
              contribute to a balanced education. The specific activities and
              their availability are to be confirmed.
            </p>
          </TextBlock>
        </TextColumns>
      </PageSection>
    </ContentPage>
  );
}
