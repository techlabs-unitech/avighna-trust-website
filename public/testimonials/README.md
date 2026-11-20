Put testimonial files here:
  images/  -> .jpg / .jpeg / .png / .webp / .avif / .gif photos
  videos/  -> .mp4 (H.264) videos, ideally under 50 MB each (compress with HandBrake)

GALLERY: every image placed in images/ appears automatically on the /gallery page
(and in the home-page photo strip) after the next build/deploy. No code change needed.

Testimonial cards (/testimonials) are still listed in src/app/testimonials/data.ts.

CAPTIONS: to describe a photo, add an entry to captions.json using the exact file name, e.g.
  "my-photo.jpg": { "title": "Short heading", "description": "One or two sentences about the photo." }
Photos without an entry get a generic caption.

CATEGORY AND DATE (used by the filters on the /gallery page): add two more fields to the same entry, e.g.
  "my-photo.jpg": { "title": "...", "description": "...", "category": "Festivals", "date": "2026-09" }
  category  one of: Campus Life, Temple & Goshala, Classroom Learning, Yoga Sessions, Vedic Chanting,
            Rituals (Homams & Pujas), Festivals, Seminars, Virtual Campus Tours, Community Seva
  date      year-month as "YYYY-MM" (a full "YYYY-MM-DD" also works). If left out, the date in the file name
            (e.g. "... 2026-10-05 ...") is used, else the date the file was added; the category then
            defaults to Community Seva.
