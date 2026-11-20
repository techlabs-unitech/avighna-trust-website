import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * View-only documents.
 *
 * The PDFs live in /private-documents (not /public), so they have no direct static address.
 * This route serves them "inline" only — it never sets a download disposition — and only when
 * the browser is embedding them in the page's viewer. Opening the address directly in a tab is
 * turned back to the Recognitions section.
 *
 * Note: anything a browser can display can in principle be saved by a determined visitor
 * (for example with a screenshot). This keeps the site from offering or encouraging downloads.
 */
const ALLOWED = new Set([
  "trust-incorporation.pdf",
  "bank-account.pdf",
  "darpan-certificate.pdf",
  "income-tax-exemption-12a.pdf",
  "income-tax-exemption-80g.pdf",
]);

export async function GET(request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  if (!ALLOWED.has(file)) return new Response("Not found", { status: 404 });

  // Sec-Fetch-Dest is "iframe" / "embed" / "object" when the viewer embeds the file and "document"
  // when someone opens the address directly. Browsers that do not send it are let through.
  const dest = request.headers.get("sec-fetch-dest");
  if (dest === "document") {
    return Response.redirect(new URL("/our-story#manyatha", request.url), 307);
  }

  try {
    const bytes = await readFile(path.join(process.cwd(), "private-documents", file));
    return new Response(new Uint8Array(bytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${file}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
