"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { menu, isActive, type MenuItem, type MenuLink } from "@/content/menu";
import { brand } from "./site-data";
import { SocialLinks } from "./social-links";
import styles from "./site-header.module.css";

const DRAWER_BREAKPOINT = 1240;

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
      <span className={styles.sa} lang="sa">
        {item.sa}
        <span className={styles.srOnly}> ({item.saRoman})</span>
      </span>
    </span>
  );
}

function DropdownLink({ link, onNavigate }: { link: MenuLink; onNavigate: () => void }) {
  return (
    <div className={styles.dropGroup}>
      <Link className={styles.dropLink} href={link.href} onClick={onNavigate}>
        <span>{link.label}</span>
        {link.sa && <small lang="sa">{link.sa}</small>}
        {link.desc && <em className={styles.dropDesc}>{link.desc}</em>}
      </Link>
      {link.children && (
        <ul className={styles.dropChildren}>
          {link.children.map((c) => (
            <li key={c.href}>
              <Link href={c.href} onClick={onNavigate}>
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
                        <div className={`${styles.panel} ${item.links!.some((l) => l.children) ? styles.panelMega : ""}`} id={panelId} inert={!isOpen}>
                          <div className={styles.panelHead}>
                            <span lang="sa">{item.sa}</span>
                            <Link href={item.href} onClick={closeAll}>
                              {item.label} overview
                            </Link>
                          </div>
                          <div className={styles.panelBody}>
                            {item.links!.map((l) => (
                              <DropdownLink key={l.href} link={l} onNavigate={closeAll} />
                            ))}
                          </div>
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
              <div className={styles.acc} data-open={expanded || undefined} key={item.label}>
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
                          <Link href={l.href} onClick={closeAll}>
                            <strong>{l.label}</strong>
                            {l.sa && <small lang="sa">{l.sa}</small>}
                          </Link>
                          {l.children?.map((c) => (
                            <Link className={styles.accSub} href={c.href} key={c.href} onClick={closeAll}>
                              {c.label}
                              {c.sa && <small lang="sa">{c.sa}</small>}
                            </Link>
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
