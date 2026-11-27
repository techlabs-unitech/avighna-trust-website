import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { Photo } from "./photo";
import { LotusDivider } from "./ornaments";
import { PageTabs } from "./page-tabs";
import { PlannedTripForm } from "./planned-trip-form";
import { ImageCarousel } from "./image-carousel";
import { DocumentList } from "./document-list";
import { GuruFeature } from "./guru-feature";
import { relatedFor } from "@/content/menu";
import type { Block, Page } from "@/content/pages";
import styles from "./page-shell.module.css";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "p":
            return (
              <p className={styles.p} key={i}>
                {b.text}
              </p>
            );
          case "list":
            return (
              <div key={i}>
                {b.title && <h3 className={styles.listTitle}>{b.title}</h3>}
                <ul className={styles.list}>
                  {b.items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            );
          case "defs":
            return (
              <dl className={styles.defs} key={i}>
                {b.items.map((d) => (
                  <div key={d.term}>
                    <dt>{d.term}</dt>
                    <dd>{d.text}</dd>
                  </div>
                ))}
              </dl>
            );
          case "cards":
            return (
              <div className={styles.cards} key={i}>
                {b.items.map((c) => {
                  const inner = (
                    <>
                      {c.image && (
                        <span aria-hidden="true" className={styles.cardImg}>
                          <Photo alt="" name={c.image} width={640} />
                        </span>
                      )}
                      {c.sa && (
                        <span className={styles.cardSa} lang="sa">
                          {c.sa}
                        </span>
                      )}
                      <h3>{c.title}</h3>
                      <p>{c.text}</p>
                      {c.href && <em>Learn more</em>}
                    </>
                  );
                  return c.href ? (
                    <Link className={`${styles.card} ${styles.cardLink}`} href={c.href} key={c.title}>
                      {inner}
                    </Link>
                  ) : (
                    <article className={styles.card} key={c.title}>
                      {inner}
                    </article>
                  );
                })}
              </div>
            );
          case "steps":
            return (
              <ol className={styles.steps} key={i}>
                {b.items.map((s) => (
                  <li key={s.title}>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside className={styles.note} key={i}>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote className={styles.quote} key={i}>
                <p lang="sa">{b.sa}</p>
                <p>{b.en}</p>
              </blockquote>
            );
          case "people":
            return (
              <div className={styles.groups} key={i}>
                {b.groups.map((g) => (
                  <section aria-label={g.title} className={styles.group} key={g.title}>
                    <h3>
                      {g.title}
                      {g.sa && <small lang="sa">{g.sa}</small>}
                    </h3>
                    <ul>
                      {g.members.map((m, n) => (
                        <li key={n}>
                          <strong>{m.name}</strong>
                          <span>{m.designation}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            );
          case "docs":
            return <DocumentList items={b.items} key={i} />;
          case "options":
            return (
              <div className={styles.options} key={i}>
                {b.groups.map((grp) => (
                  <section className={styles.optGroup} key={grp.title}>
                    <h3>{grp.title}</h3>
                    {grp.text && <p>{grp.text}</p>}
                    <ul>
                      {grp.items.map((it) => (
                        <li className={styles.optItem} key={it.label}>
                          <div>
                            <strong>{it.label}</strong>
                            <span>{it.text}</span>
                          </div>
                          <div className={styles.optAmount}>
                            <b data-pending={it.amount ? undefined : true}>{it.amount ?? "Amount to be confirmed"}</b>
                            {it.unit && <small>{it.unit}</small>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            );
          case "resources":
            return (
              <ul className={styles.resources} key={i}>
                {b.items.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} rel="noopener noreferrer" target="_blank">
                      <small>{r.source}</small>
                      <strong>{r.label}</strong>
                      <span>{r.text}</span>
                      <em>Open in a new tab ↗</em>
                    </a>
                  </li>
                ))}
              </ul>
            );
          case "carousel":
            return <ImageCarousel items={b.items} key={i} label={b.label} />;
          case "feature":
            return <GuruFeature alt={b.alt} caption={b.caption} key={i} name={b.name} paragraphs={b.paragraphs} sa={b.sa} src={b.src} />;
          case "plannedTripForm":
            return <PlannedTripForm key={i} />;
          case "tabs":
            return <PageTabs key={i} tabs={b.items.map((t) => ({ id: t.id, label: t.label, sa: t.sa, content: <Blocks blocks={t.blocks} /> }))} />;
          case "links":
            return (
              <div className={styles.links} key={i}>
                {b.items.map((l) => (
                  <Link className={l.ghost ? styles.btnGhost : styles.btn} href={l.href} key={l.href + l.label}>
                    {l.label}
                  </Link>
                ))}
              </div>
            );
        }
      })}
    </>
  );
}

export function PageShell({ page, parents = [] }: { page: Page; parents?: { label: string; href: string }[] }) {
  const showIndex = page.sections.length > 2;
  const related = page.next ?? relatedFor(page.path);
  return (
    <>
      <SiteHeader activePath={page.path} />
      <main id="main">
        <section className={styles.hero}>
          <div className={styles.heroImg} aria-hidden="true">
            <Photo name={page.image} width={1800} alt="" priority />
          </div>
          <span className={styles.heroVeil} />
          <div className={styles.heroInner}>
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <Link href="/">Home</Link>
              {parents.map((p) => (
                <span className={styles.crumbPair} key={p.href}>
                  <span aria-hidden="true">/</span>
                  <Link href={p.href}>{p.label}</Link>
                </span>
              ))}
              <span aria-hidden="true">/</span>
              <span aria-current="page">{page.title}</span>
            </nav>
            <p className={styles.kicker}>{page.kicker}</p>
            <h1>
              {page.title}
              <span className={styles.titleSa} lang="sa">
                {page.sa}
              </span>
            </h1>
            <p className={styles.lead}>{page.lead}</p>
            {page.actions && (
              <div className={styles.links}>
                {page.actions.map((a) => (
                  <Link className={a.ghost ? styles.btnGhostLight : styles.btnGold} href={a.href} key={a.href}>
                    {a.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <span className={styles.band} />
        </section>

        <div className={`${styles.body} ${showIndex ? styles.withIndex : ""}`}>
          {showIndex && (
            <nav aria-label="On this page" className={styles.index}>
              <p>On this page</p>
              <ul>
                {page.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`}>
                      {s.title}
                      {s.sa && <small lang="sa">{s.sa}</small>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          <div className={styles.sections}>
            {page.sections.map((s) => (
              <section className={styles.section} id={s.id} key={s.id} aria-labelledby={`${s.id}-t`}>
                <header>
                  {s.sa && (
                    <span className={styles.sectionSa} lang="sa">
                      {s.sa}
                    </span>
                  )}
                  <h2 id={`${s.id}-t`}>{s.title}</h2>
                  <LotusDivider className={styles.divider} />
                  {s.intro && <p className={styles.sectionIntro}>{s.intro}</p>}
                </header>
                <Blocks blocks={s.blocks} />
              </section>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <section className={styles.next} aria-label="Continue exploring">
            <h2>Continue exploring</h2>
            <div>
              {related.map((n) => (
                <Link href={n.href} key={n.href}>
                  <strong>{n.label}</strong>
                  {n.sa && <span lang="sa">{n.sa}</span>}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
