Put testimonial files here:
  images/  -> .jpg / .jpeg / .png / .webp / .avif / .gif photos
  videos/  -> .mp4 (H.264) videos, ideally under 50 MB each (compress with HandBrake)

GALLERY: every image placed in images/ appears automatically on the /gallery page
(and in the home-page photo strip) after the next build/deploy. No code change needed.

Testimonial cards (/testimonials) are still listed in src/app/testimonials/data.ts.

CAPTIONS: to describe a photo, add an entry to captions.json using the exact file name, e.g.
  "my-photo.jpg": { "title": "Short heading", "description": "One or two sentences about the photo." }
Photos without an entry get a generic caption.
