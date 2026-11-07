import { readdir } from "node:fs/promises";
import { cacheLife } from "next/cache";
import path from "node:path";

export type GalleryImage = {
  /** Public URL, already URL-encoded (spaces etc. are safe). */
  src: string;
  /** Original file name, used for the accessible label. */
  name: string;
};

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

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      src: `/testimonials/images/${encodeURIComponent(file)}`,
      name: path.parse(file).name,
    }));
}
