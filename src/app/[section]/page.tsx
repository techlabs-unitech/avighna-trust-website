import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "../_components/page-shell";
import { getPage, pages } from "@/content/pages";

export function generateStaticParams() {
  return pages.filter((p) => p.path.split("/").length === 2).map((p) => ({ section: p.path.slice(1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const page = getPage([section]);
  if (!page) return {};
  return { title: `${page.title} · ${page.sa} | Avighna Trust`, description: page.lead.slice(0, 160) };
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  const page = getPage([section]);
  if (!page) notFound();
  return <PageShell page={page} />;
}
