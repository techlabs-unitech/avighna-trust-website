import { readFile, readdir } from "node:fs/promises";
import { cacheLife } from "next/cache";
import path from "node:path";

export type GalleryImage = {
  /** Public URL, already URL-encoded (spaces etc. are safe). */
  src: string;
  /** Original file name, used for the accessible label. */
  name: string;
  /** Short heading for the photo (from captions.json) */
  title: string;
  /** One or two sentences describing the photo (from captions.json) */
  description: string;
};

const FALLBACK_TITLE = "A moment from our community";
const FALLBACK_DESCRIPTION = "A photograph from the life of Avighna Foundation and Vedavani Pathashala.";

type CaptionMap = Record<string, { title?: string; description?: string }>;

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

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      src: `/testimonials/images/${encodeURIComponent(file)}`,
      name: path.parse(file).name,
      title: captions[file]?.title ?? FALLBACK_TITLE,
      description: captions[file]?.description ?? FALLBACK_DESCRIPTION,
    }));
}
