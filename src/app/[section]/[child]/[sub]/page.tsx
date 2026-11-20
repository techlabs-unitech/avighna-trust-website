import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "../../../_components/page-shell";
import { getPage, pages } from "@/content/pages";
import { parentsFor } from "@/content/menu";

type Params = { section: string; child: string; sub: string };

export function generateStaticParams() {
  return pages
    .filter((p) => p.path.split("/").length === 4)
    .map((p) => {
      const [, section, child, sub] = p.path.split("/");
      return { section, child, sub };
    });
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { section, child, sub } = await params;
  const page = getPage([section, child, sub]);
  if (!page) return {};
  return { title: `${page.title} · ${page.sa} | Avighna Trust`, description: page.lead.slice(0, 160) };
}

export default async function SubPage({ params }: { params: Promise<Params> }) {
  const { section, child, sub } = await params;
  const page = getPage([section, child, sub]);
  if (!page) notFound();
  return <PageShell page={page} parents={parentsFor(page.path)} />;
}
