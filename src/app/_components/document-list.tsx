"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./page-shell.module.css";

type Doc = { label: string; text: string; href: string };

/**
 * Registration documents, view-only. Each card opens the PDF inside the page (toolbar hidden, so no
 * download or print buttons), and the page itself blocks the right-click menu and the save / print
 * shortcuts while a document is open.
 */
export function DocumentList({ items }: { items: Doc[] }) {
  const [current, setCurrent] = useState<Doc | null>(null);
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (current && !el.open) el.showModal();
    if (!current && el.open) el.close();
  }, [current]);

  useEffect(() => {
    if (!current) return;
    const block = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["s", "p"].includes(e.key.toLowerCase())) e.preventDefault();
    };
    window.addEventListener("keydown", block);
    return () => window.removeEventListener("keydown", block);
  }, [current]);

  return (
    <>
      <ul className={styles.docs}>
        {items.map((d) => (
          <li key={d.label}>
            <button className={styles.docButton} onClick={() => setCurrent(d)} type="button">
              <strong>{d.label}</strong>
              <span>{d.text}</span>
              <em>View document</em>
            </button>
          </li>
        ))}
      </ul>

      <dialog aria-label={current?.label ?? "Document"} className={styles.docDialog} onClose={() => setCurrent(null)} ref={dialog}>
        {current && (
          <div className={styles.docFrameWrap} onContextMenu={(e) => e.preventDefault()}>
            <header className={styles.docBar}>
              <div>
                <strong>{current.label}</strong>
                <small>View only</small>
              </div>
              <button autoFocus className={styles.docClose} onClick={() => setCurrent(null)} type="button">
                Close ✕
              </button>
            </header>
            <iframe className={styles.docFrame} src={`${current.href}#toolbar=0&navpanes=0&view=FitH`} title={current.label} />
          </div>
        )}
      </dialog>
    </>
  );
}
