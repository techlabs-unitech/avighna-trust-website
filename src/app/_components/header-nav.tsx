"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { menu, isActive, type MenuItem, type MenuLink } from "@/content/menu";
import { brand } from "./site-data";
import { SocialLinks } from "./social-links";
import styles from "./site-header.module.css";

const DRAWER_BREAKPOINT = 1240;

/** "page" = exactly this page/section, "true" = a parent of the current page, undefined = not active. */
type Current = "page" | "true" | undefined;

function currentOf(href: string, path: string, hash: string): Current {
  const [base, anchor] = href.split("#");
  if (anchor) return base === path && hash === `#${anchor}` ? "page" : undefined;
  if (path === base) return "page";
  return path.startsWith(`${base}/`) ? "true" : undefined;
}

function Chevron() {
  return (
    <svg className={styles.chevIcon} viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <span className={`${styles.logoBlock} ${className ?? ""}`}>
      <span className={styles.logoFrame}>
        <Image alt="Avighna Foundation logo" className={styles.logo} height={brand.logoHeight} loading="eager" priority src={brand.logoSrc} width={brand.logoWidth} />
      </span>
      <span className={styles.shloka} lang="sa">
        {brand.shloka}
      </span>
    </span>
  );
}

function HomeIcon() {
  return (
    <svg className={styles.homeIcon} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

/** English word with its Sanskrit word beneath it, on a turmeric highlight. */
function Label({ item, iconOnly }: { item: Pick<MenuItem, "label" | "sa" | "saRoman" | "icon">; iconOnly?: boolean }) {
  if (item.icon === "home") {
    return (
      <span className={iconOnly ? styles.iconLabel : styles.iconLabelRow}>
        <HomeIcon />
        {iconOnly ? <span className={styles.srOnly}>{item.label}</span> : <span className={styles.en}>{item.label}</span>}
      </span>
    );
  }
  return (
    <span className={styles.label}>
      <span className={styles.en}>{item.label}</span>
      <span className={styles.roman} lang="sa-Latn">
        {item.saRoman}
      </span>
      <span className={styles.sa} lang="sa">
        {item.sa}
      </span>
    </span>
  );
}

function DropdownLink({ link, onNavigate, path, hash }: { link: MenuLink; onNavigate: () => void; path: string; hash: string }) {
  return (
    <div className={styles.dropGroup}>
      <Link aria-current={currentOf(link.href, path, hash)} className={styles.dropLink} href={link.href} onClick={onNavigate}>
        <span>{link.label}</span>
        {link.sa && <small lang="sa">{link.sa}</small>}
        {link.desc && <em className={styles.dropDesc}>{link.desc}</em>}
      </Link>
      {link.children && (
        <ul className={styles.dropChildren}>
          {link.children.map((c) => (
            <li key={c.href}>
              <Link aria-current={currentOf(c.href, path, hash)} href={c.href} onClick={onNavigate}>
                {c.label}
                {c.sa && <small lang="sa">{c.sa}</small>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Pilgrimage panel. "Customized Trips" and "Planned Trips" are simply named (neither is a dropdown).
 * Under Customized Trips the six regions are listed; hovering (or focusing) a region opens its states to the side.
 */
function TreePanel({ links, onNavigate, path, hash }: { links: MenuLink[]; onNavigate: () => void; path: string; hash: string }) {
  return (
    <div className={styles.treeBody}>
      {links.map((l) => (
        <div className={styles.treeGroup} key={l.href}>
          <Link aria-current={l.group ? undefined : currentOf(l.href, path, hash)} className={styles.treeHeading} href={l.href} onClick={onNavigate}>
            <span>{l.label}</span>
            {l.sa && <small lang="sa">{l.sa}</small>}
          </Link>
          {l.children && (
            <ul className={styles.treeRegions}>
              {l.children.map((r) => (
                <li className={styles.treeRegion} key={r.href}>
                  <Link aria-current={currentOf(r.href, path, hash)} className={styles.treeRegionLink} href={r.href} onClick={onNavigate}>
                    <span>{r.label}</span>
                    {r.sa && <small lang="sa">{r.sa}</small>}
                    <svg aria-hidden="true" className={styles.treeArrow} fill="none" height="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" viewBox="0 0 24 24" width="12">
                      <path d="m15 6-6 6 6 6" />
                    </svg>
                  </Link>
                  {r.children && (
                    <ul aria-label={`${r.label} states`} className={styles.treeStates}>
                      {r.children.map((st) => (
                        <li key={st.href}>
                          <Link aria-current={currentOf(st.href, path, hash)} href={st.href} onClick={onNavigate}>
                            <span>{st.label}</span>
                            {st.sa && <small lang="sa">{st.sa}</small>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export function HeaderNav({ activePath }: { activePath: string }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accOpen, setAccOpen] = useState<string | null>(null);
  const [hash, setHash] = useState("");

  // Track the #section in the URL so on-page submenu items (e.g. Our Story → Vision) can show as current.
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [activePath]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty("--progress", String(max > 0 ? Math.min(y / max, 1) : 0));
      setScrolled((prev) => (prev === y > 12 ? prev : y > 12));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const closeAll = useCallback(() => {
    setOpenItem(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenItem(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
      if (openItem) {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-toggle="${openItem}"]`);
        setOpenItem(null);
        trigger?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > DRAWER_BREAKPOINT) setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen, openItem]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`} ref={headerRef}>
        <div className={styles.inner}>
          <Link aria-label="Avighna Trust and Vedavani Pathashala — home" className={styles.brand} href="/" onClick={closeAll}>
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className={styles.nav} ref={navRef}>
            <ul>
              {menu.map((item) => {
                const hasMenu = Boolean(item.links?.length);
                const isOpen = openItem === item.label;
                const current = isActive(item, activePath);
                const panelId = `panel-${item.label.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <li
                    className={`${styles.item} ${isOpen ? styles.open : ""}`}
                    data-current={current || undefined}
                    key={item.label}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenItem((g) => (g === item.label ? null : g));
                    }}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse" || !hasMenu) return;
                      clearHover();
                      setOpenItem(item.label);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType !== "mouse" || !hasMenu) return;
                      clearHover();
                      hoverTimer.current = setTimeout(() => setOpenItem((g) => (g === item.label ? null : g)), 160);
                    }}
                  >
                    <Link aria-current={current ? "page" : undefined} className={`${styles.link} ${item.icon ? styles.linkIcon : ""}`} data-current={current || undefined} href={item.href} onClick={closeAll}>
                      <Label iconOnly item={item} />
                    </Link>
                    {hasMenu && (
                      <>
                        <button
                          aria-controls={panelId}
                          aria-expanded={isOpen}
                          aria-label={`${isOpen ? "Close" : "Open"} ${item.label} submenu`}
                          className={styles.toggle}
                          data-toggle={item.label}
                          onClick={() => setOpenItem(isOpen ? null : item.label)}
                          type="button"
                        >
                          <Chevron />
                        </button>
                        <div className={`${styles.panel} ${item.tree ? styles.panelTree : item.links!.some((l) => l.children) ? styles.panelMega : ""}`} id={panelId} inert={!isOpen}>
                          <div className={styles.panelHead}>
                            <span lang="sa">{item.sa}</span>
                            <Link href={item.href} onClick={closeAll}>
                              {item.label} overview
                            </Link>
                          </div>
                          {item.tree ? (
                            <TreePanel hash={hash} links={item.links!} onNavigate={closeAll} path={activePath} />
                          ) : (
                            <div className={styles.panelBody}>
                              {item.links!.map((l) => (
                                <DropdownLink hash={hash} key={l.href} link={l} onNavigate={closeAll} path={activePath} />
                              ))}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            className={styles.burger}
            data-open={mobileOpen || undefined}
            onClick={() => setMobileOpen((o) => !o)}
            ref={burgerRef}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <span aria-hidden="true" className={styles.progress} />
      </header>

      {/* Drawer lives outside <header>: the header's backdrop-filter would trap position:fixed */}
      <div aria-hidden="true" className={styles.overlay} data-open={mobileOpen || undefined} onClick={() => setMobileOpen(false)} />
      <aside aria-label="Mobile navigation" className={styles.drawer} data-open={mobileOpen || undefined} id="mobile-menu" inert={!mobileOpen}>
        <div className={styles.drawerHead}>
          <Logo className={styles.drawerLogo} />
          <button aria-label="Close navigation menu" className={styles.drawerClose} onClick={() => setMobileOpen(false)} ref={closeBtnRef} type="button">
            ×
          </button>
        </div>

        <nav aria-label="Mobile links" className={styles.drawerNav}>
          {menu.map((item) => {
            const hasMenu = Boolean(item.links?.length);
            const current = isActive(item, activePath);
            const expanded = hasMenu && (accOpen === item.label || (accOpen === null && current));
            return (
              <div className={styles.acc} data-current={current || undefined} data-open={expanded || undefined} key={item.label}>
                <div className={styles.accRow}>
                  <Link aria-current={current ? "page" : undefined} className={styles.accLink} href={item.href} onClick={closeAll}>
                    <Label item={item} />
                  </Link>
                  {hasMenu && (
                    <button aria-expanded={expanded} aria-label={`${item.label} submenu`} className={styles.accToggle} onClick={() => setAccOpen(expanded ? "" : item.label)} type="button">
                      <Chevron />
                    </button>
                  )}
                </div>
                {hasMenu && (
                  <div className={styles.accPanel} inert={!expanded}>
                    <div className={styles.accInner}>
                      {item.links!.map((l) => (
                        <div key={l.href}>
                          <Link aria-current={l.group ? undefined : currentOf(l.href, activePath, hash)} href={l.href} onClick={closeAll}>
                            <strong>{l.label}</strong>
                            {l.sa && <small lang="sa">{l.sa}</small>}
                          </Link>
                          {l.children?.map((c) => (
                            <Fragment key={c.href}>
                              <Link aria-current={currentOf(c.href, activePath, hash)} className={styles.accSub} href={c.href} onClick={closeAll}>
                                {c.label}
                                {c.sa && <small lang="sa">{c.sa}</small>}
                              </Link>
                              {c.children?.map((g) => (
                                <Link aria-current={currentOf(g.href, activePath, hash)} className={styles.accSub2} href={g.href} key={g.href} onClick={closeAll}>
                                  {g.label}
                                  {g.sa && <small lang="sa">{g.sa}</small>}
                                </Link>
                              ))}
                            </Fragment>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className={styles.drawerFoot}>
          <Link className={styles.drawerDonate} href="/donation" onClick={closeAll}>
            Give with devotion · दानम्
          </Link>
          <p className={styles.followLabel}>Follow us</p>
          <SocialLinks className={styles.drawerSocial} label="Social media" linkClassName={styles.socialLink} />
        </div>
      </aside>
    </>
  );
}
