"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import styles from "./page-shell.module.css";

type Tab = { id: string; label: string; sa?: string; content: ReactNode };

/**
 * Accessible tabs. A link such as /page#antarajala-kaksha opens that tab on arrival,
 * and choosing a tab updates the address so it can be shared.
 */
const subscribe = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};
const readHash = () => window.location.hash.slice(1);

export function PageTabs({ tabs }: { tabs: Tab[] }) {
  const uid = useId();
  const hash = useSyncExternalStore(subscribe, readHash, () => "");
  const [picked, setPicked] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const wrap = useRef<HTMLDivElement | null>(null);

  // A tab the visitor chose wins; otherwise the tab named in the address; otherwise the first.
  const active = picked ?? (tabs.some((t) => t.id === hash) ? hash : tabs[0].id);

  useEffect(() => {
    // A new #link (for example from the menu) overrides an earlier choice.
    const reset = () => setPicked(null);
    window.addEventListener("hashchange", reset);
    if (tabs.some((t) => t.id === readHash())) wrap.current?.scrollIntoView({ block: "start" });
    return () => window.removeEventListener("hashchange", reset);
  }, [tabs]);

  const select = (id: string) => {
    setPicked(id);
    window.history.replaceState(null, "", `#${id}`);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    select(tabs[next].id);
    refs.current[tabs[next].id]?.focus();
  };

  return (
    <div className={styles.tabs} ref={wrap}>
      <div className={styles.tabList} role="tablist" aria-label="Classroom type">
        {tabs.map((t, i) => (
          <button
            aria-controls={`${uid}-${t.id}`}
            aria-selected={active === t.id}
            className={styles.tab}
            id={`${uid}-tab-${t.id}`}
            key={t.id}
            onClick={() => select(t.id)}
            onKeyDown={(e) => onKey(e, i)}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            role="tab"
            tabIndex={active === t.id ? 0 : -1}
            type="button"
          >
            <span>{t.label}</span>
            {t.sa && <small lang="sa">{t.sa}</small>}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div aria-labelledby={`${uid}-tab-${t.id}`} className={styles.tabPanel} hidden={active !== t.id} id={`${uid}-${t.id}`} key={t.id} role="tabpanel" tabIndex={0}>
          {t.content}
        </div>
      ))}
    </div>
  );
}
