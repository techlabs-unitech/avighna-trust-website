import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "../../_components/page-shell";
import { getPage, pages } from "@/content/pages";

export function generateStaticParams() {
  return pages.filter((p) => p.path.split("/").length === 3).map((p) => {
    const [, section, child] = p.path.split("/");
    return { section, child };
  });
}

export async function generateMetadata({ params }: { params: Promise<{ section: string; child: string }> }): Promise<Metadata> {
  const { section, child } = await params;
  const page = getPage([section, child]);
  if (!page) return {};
  return { title: `${page.title} · ${page.sa} | Avighna Trust`, description: page.lead.slice(0, 160) };
}

export default async function ChildPage({ params }: { params: Promise<{ section: string; child: string }> }) {
  const { section, child } = await params;
  const page = getPage([section, child]);
  const parent = getPage([section]);
  if (!page) notFound();
  return <PageShell page={page} parent={parent ? { label: parent.title, href: parent.path } : undefined} />;
}
