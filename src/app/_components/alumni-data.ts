/**
 * ALUMNI CONTENT
 * --------------
 * Edit this list to update the "Our Proud Alumni" carousel on the home page.
 *  - Photo: put the file in public/alumni/ and set  photo: "/alumni/your-file.jpg".
 *           Leave photo empty ("") to show a coloured initials avatar.
 *  - These entries are PLACEHOLDERS — replace with real alumni names and
 *    feedback (with their consent) before publishing.
 */
export type Alumnus = {
  name: string;
  batch: string;
  now: string;
  feedback: string;
  photo?: string;
};

export const alumni: Alumnus[] = [
  {
    name: "Alumnus Name",
    batch: "Batch of 20XX",
    now: "Current role / studies",
    feedback: "Add the alumnus's own words about their years at the Pathashala and what they carry with them today.",
    photo: "",
  },
  {
    name: "Alumnus Name",
    batch: "Batch of 20XX",
    now: "Current role / studies",
    feedback: "Add the alumnus's own words about their years at the Pathashala and what they carry with them today.",
    photo: "",
  },
  {
    name: "Alumnus Name",
    batch: "Batch of 20XX",
    now: "Current role / studies",
    feedback: "Add the alumnus's own words about their years at the Pathashala and what they carry with them today.",
    photo: "",
  },
  {
    name: "Alumnus Name",
    batch: "Batch of 20XX",
    now: "Current role / studies",
    feedback: "Add the alumnus's own words about their years at the Pathashala and what they carry with them today.",
    photo: "",
  },
  {
    name: "Alumnus Name",
    batch: "Batch of 20XX",
    now: "Current role / studies",
    feedback: "Add the alumnus's own words about their years at the Pathashala and what they carry with them today.",
    photo: "",
  },
];
