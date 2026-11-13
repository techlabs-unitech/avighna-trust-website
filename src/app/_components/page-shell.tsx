import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-chrome";
import { Photo } from "./photo";
import { LotusDivider } from "./ornaments";
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
              <ul className={styles.list} key={i}>
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
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

export function PageShell({ page, parent }: { page: Page; parent?: { label: string; href: string } }) {
  const showIndex = page.sections.length > 2;
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
              {parent && (
                <>
                  <span aria-hidden="true">/</span>
                  <Link href={parent.href}>{parent.label}</Link>
                </>
              )}
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

        {page.next && (
          <section className={styles.next} aria-label="Continue exploring">
            <h2>Continue exploring</h2>
            <div>
              {page.next.map((n) => (
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
