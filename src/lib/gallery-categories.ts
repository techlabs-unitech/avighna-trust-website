/**
 * Gallery categories — no server-only imports, so both the server (reads captions.json) and the
 * browser (draws the filter chips) can use this file.
 *
 * The donation categories come first and match the seven ways of giving (Dhaanam); the others follow.
 */
export const DONATION_CATEGORIES = [
  "Vidya Dhaanam",
  "Anna Dhaanam",
  "Go Dhaanam",
  "Veda Rakshanam",
  "Deva Dhaanam",
  "Arogya Dhaanam",
  "Vriddhashrama Dhaanam",
] as const;

export const ACTIVITY_CATEGORIES = [
  "Campus Life",
  "Temple & Goshala",
  "Classroom Learning",
  "Yoga Sessions",
  "Vedic Chanting",
  "Rituals (Homams & Pujas)",
  "Festivals",
  "Seminars",
  "Virtual Campus Tours",
  "Community Seva",
] as const;

export const GALLERY_CATEGORIES = [...DONATION_CATEGORIES, ...ACTIVITY_CATEGORIES] as const;
