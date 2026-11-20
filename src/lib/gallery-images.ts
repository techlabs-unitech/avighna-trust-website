import { readFile, readdir, stat } from "node:fs/promises";
import { cacheLife } from "next/cache";
import path from "node:path";
import { GALLERY_CATEGORIES } from "./gallery-categories";

export type GalleryImage = {
  /** A photograph, or a short video clip (shown with a play mark and played in the viewer). */
  kind: "image" | "video";
  /** Still picture shown for a video (same file name, .jpg, next to the .mp4) */
  poster?: string;
  /** Public URL, already URL-encoded (spaces etc. are safe). */
  src: string;
  /** Original file name, used for the accessible label. */
  name: string;
  /** Short heading for the photo (from captions.json) */
  title: string;
  /** One or two sentences describing the photo (from captions.json) */
  description: string;
  /** Gallery category (from captions.json) — one of GALLERY_CATEGORIES */
  category: string;
  /** Year and month the photo belongs to, as "YYYY-MM" (from captions.json, else the file name, else the file's date) */
  date: string;
};

export { GALLERY_CATEGORIES } from "./gallery-categories";

const FALLBACK_CATEGORY = "Community Seva";

const FALLBACK_TITLE = "A moment from our community";
const FALLBACK_DESCRIPTION = "A photograph from the life of Avighna Foundation and Vedavani Pathashala.";

type CaptionMap = Record<string, { title?: string; description?: string; category?: string; date?: string }>;

async function readCaptions(): Promise<CaptionMap> {
  try {
    const raw = await readFile(path.join(process.cwd(), "public", "testimonials", "captions.json"), "utf8");
    return JSON.parse(raw) as CaptionMap;
  } catch {
    return {};
  }
}

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

const IMAGE_DIR = path.join(process.cwd(), "public", "testimonials", "images");
const VIDEO_DIR = path.join(process.cwd(), "public", "testimonials", "videos");

/**
 * Reads every image inside public/testimonials/images so that anything you
 * drop into that folder shows up on the gallery pages automatically.
 * The list is read on the server when the site is built / deployed.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  "use cache";
  cacheLife("hours");

  let files: string[] = [];
  try {
    files = await readdir(IMAGE_DIR);
  } catch {
    return [];
  }

  const captions = await readCaptions();

  const monthOf = (value?: string) => value?.match(/^(\d{4})-(\d{2})/)?.slice(1, 3).join("-");

  const list = await Promise.all(
    files
      .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
      .map(async (file): Promise<GalleryImage> => {
        const cap = captions[file];
        const known = GALLERY_CATEGORIES.find((c) => c === cap?.category);
        let date = monthOf(cap?.date) ?? monthOf(file.match(/\d{4}-\d{2}-\d{2}/)?.[0]);
        if (!date) {
          try {
            date = (await stat(path.join(IMAGE_DIR, file))).mtime.toISOString().slice(0, 7);
          } catch {
            date = new Date().toISOString().slice(0, 7);
          }
        }
        return {
          kind: "image",
          src: `/testimonials/images/${encodeURIComponent(file)}`,
          name: path.parse(file).name,
          title: cap?.title ?? FALLBACK_TITLE,
          description: cap?.description ?? FALLBACK_DESCRIPTION,
          category: known ?? FALLBACK_CATEGORY,
          date,
        };
      }),
  );

  // Short clips: public/testimonials/videos/<name>.mp4 with a poster picture <name>.jpg beside it
  let clips: string[] = [];
  try {
    clips = await readdir(VIDEO_DIR);
  } catch {}
  const videos = await Promise.all(
    clips
      .filter((file) => path.extname(file).toLowerCase() === ".mp4")
      .map(async (file): Promise<GalleryImage> => {
        const cap = captions[file];
        const base = path.parse(file).name;
        let date = monthOf(cap?.date) ?? monthOf(file.match(/\d{4}-\d{2}-\d{2}/)?.[0]);
        if (!date) {
          try {
            date = (await stat(path.join(VIDEO_DIR, file))).mtime.toISOString().slice(0, 7);
          } catch {
            date = new Date().toISOString().slice(0, 7);
          }
        }
        return {
          kind: "video",
          src: `/testimonials/videos/${encodeURIComponent(file)}`,
          poster: `/testimonials/videos/${encodeURIComponent(base)}.jpg`,
          name: base,
          title: cap?.title ?? FALLBACK_TITLE,
          description: cap?.description ?? FALLBACK_DESCRIPTION,
          category: GALLERY_CATEGORIES.find((c) => c === cap?.category) ?? FALLBACK_CATEGORY,
          date,
        };
      }),
  );

  // Newest first, then by name
  return [...list, ...videos].sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }));
}
