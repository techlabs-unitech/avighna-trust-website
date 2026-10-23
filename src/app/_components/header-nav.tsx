"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { brand, navigationGroups } from "./site-data";
import { SocialLinks } from "./social-links";
import styles from "./site-header.module.css";

const MOBILE_BREAKPOINT = 980;

function Chevron() {
  return (
    <svg className={styles.chev} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Logo({ className }: { className?: string }) {
  return (
    <span className={`${styles.logoFrame} ${className ?? ""}`}>
      <Image alt="Avighna Foundation logo" className={styles.logo} height={443} loading="eager" src={brand.logoSrc} width={753} />
    </span>
  );
}

export function HeaderNav({ activePath }: { activePath: string }) {
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accOpen, setAccOpen] = useState<string | null>(null);

  // Scroll state + progress bar (no re-render per frame)
  useEffect(() => {
    let frame = 0;
    let lastY: number | null = null;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      headerRef.current?.style.setProperty("--progress", String(max > 0 ? Math.min(y / max, 1) : 0));
      setScrolled((prev) => (prev === y > 12 ? prev : y > 12));
      if (lastY !== null && Math.abs(y - lastY) > 4) setOpenGroup((g) => (g ? null : g));
      lastY = y;
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
    setOpenGroup(null);
    setMobileOpen(false);
  }, []);

  // Outside click / Escape / resize
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        burgerRef.current?.focus();
      }
      if (openGroup) {
        const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-group="${openGroup}"]`);
        setOpenGroup(null);
        trigger?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) setMobileOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen, openGroup]);

  // Lock page scroll while the mobile menu is open
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
          <Link aria-label="Avighna Trust and Vedavani Pathashala home" className={styles.brand} href="/" onClick={closeAll}>
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className={styles.nav} ref={navRef}>
            <ul>
              {navigationGroups.map(({ label, links }) => {
                const isOpen = openGroup === label;
                const isActive = links.some((l) => l.href === activePath);
                const menuId = `menu-${label.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <li
                    className={`${styles.item} ${isOpen ? styles.open : ""}`}
                    key={label}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenGroup((g) => (g === label ? null : g));
                    }}
                    onPointerEnter={(e) => {
                      if (e.pointerType !== "mouse") return;
                      clearHover();
                      setOpenGroup(label);
                    }}
                    onPointerLeave={(e) => {
                      if (e.pointerType !== "mouse") return;
                      clearHover();
                      hoverTimer.current = setTimeout(() => setOpenGroup((g) => (g === label ? null : g)), 140);
                    }}
                  >
                    <button
                      aria-controls={menuId}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      className={styles.trigger}
                      data-active={isActive || undefined}
                      data-group={label}
                      onClick={() => setOpenGroup(isOpen ? null : label)}
                      type="button"
                    >
                      {label}
                      <Chevron />
                    </button>
                    <div className={styles.menu} id={menuId} inert={!isOpen}>
                      {links.map(({ href, label: linkLabel, description }) => (
                        <Link
                          aria-current={activePath === href ? "page" : undefined}
                          className={styles.menuLink}
                          href={href}
                          key={href}
                          onClick={closeAll}
                        >
                          <span className={styles.menuText}>
                            <strong>{linkLabel}</strong>
                            <small>{description}</small>
                          </span>
                          <span aria-hidden="true" className={styles.menuArrow}>→</span>
                        </Link>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link aria-label="Donate: learn how to support our mission" className={styles.donate} href="/donate" onClick={closeAll}>
            Donate <span aria-hidden="true">↗</span>
          </Link>

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

      {/* Drawer lives outside <header>: the header's backdrop-filter would otherwise trap position:fixed */}
      <div aria-hidden="true" className={styles.overlay} data-open={mobileOpen || undefined} onClick={() => setMobileOpen(false)} />
      <aside aria-label="Mobile navigation" className={styles.drawer} data-open={mobileOpen || undefined} id="mobile-menu" inert={!mobileOpen}>
        <div className={styles.drawerHead}>
          <Logo className={styles.drawerLogo} />
          <button aria-label="Close navigation menu" className={styles.drawerClose} onClick={() => setMobileOpen(false)} ref={closeBtnRef} type="button">
            ×
          </button>
        </div>

        <nav aria-label="Mobile links" className={styles.drawerNav}>
          {navigationGroups.map(({ label, links }) => {
            const expanded = accOpen === label || (accOpen === null && links.some((l) => l.href === activePath));
            return (
              <div className={styles.acc} data-open={expanded || undefined} key={label}>
                <button aria-expanded={expanded} className={styles.accTrigger} onClick={() => setAccOpen(expanded ? "" : label)} type="button">
                  {label}
                  <Chevron />
                </button>
                <div className={styles.accPanel} inert={!expanded}>
                  <div className={styles.accInner}>
                    {links.map(({ href, label: linkLabel, description }) => (
                      <Link aria-current={activePath === href ? "page" : undefined} href={href} key={href} onClick={closeAll}>
                        <strong>{linkLabel}</strong>
                        <small>{description}</small>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className={styles.drawerFoot}>
          <Link className={styles.drawerDonate} href="/donate" onClick={closeAll}>
            Support our mission <span aria-hidden="true">↗</span>
          </Link>
          <p className={styles.followLabel}>Follow us</p>
          <SocialLinks className={styles.drawerSocial} label="Social media" linkClassName={styles.socialLink} />
        </div>
      </aside>
    </>
  );
}
