/**
 * TESTIMONIALS CONTENT
 * --------------------
 * To add a testimonial, copy one block below and edit it.
 *
 *  - Photos:  put the file in  public/testimonials/images/  and set  src: "/testimonials/images/your-file.jpg"
 *  - Videos:  put the file in  public/testimonials/videos/  and set  src: "/testimonials/videos/your-file.mp4"
 *             (optional)  poster: "/testimonials/images/your-poster.jpg"  for the preview frame
 *  - Large videos: upload to Supabase Storage / YouTube-hosted MP4 and paste the full https URL in `src`.
 *  - Leave `src` empty ("") and the card shows an "upload pending" placeholder.
 */
export type Testimonial = {
  id: string;
  type: "video" | "image";
  src: string;
  poster?: string;
  title: string;
  name: string;
  role?: string;
  description: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "parent-video-1",
    type: "video",
    src: "",
    title: "Title of the video",
    name: "Name to be added",
    role: "Parent",
    description: "Add a short description of what is said or shown in this video.",
  },
  {
    id: "student-video-1",
    type: "video",
    src: "",
    title: "Title of the video",
    name: "Name to be added",
    role: "Student",
    description: "Add a short description of what is said or shown in this video.",
  },
  {
    id: "visitor-video-1",
    type: "video",
    src: "",
    title: "Title of the video",
    name: "Name to be added",
    role: "Visitor",
    description: "Add a short description of what is said or shown in this video.",
  },
  {
    id: "photo-1",
    type: "image",
    src: "",
    title: "Title of the photo",
    name: "Name to be added",
    role: "Well-wisher",
    description: "Add a short caption or note that goes with this photo.",
  },
  {
    id: "photo-2",
    type: "image",
    src: "",
    title: "Title of the photo",
    name: "Name to be added",
    role: "Volunteer",
    description: "Add a short caption or note that goes with this photo.",
  },
  {
    id: "photo-3",
    type: "image",
    src: "",
    title: "Title of the photo",
    name: "Name to be added",
    role: "Parent",
    description: "Add a short caption or note that goes with this photo.",
  },
];
