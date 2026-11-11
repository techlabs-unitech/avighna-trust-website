"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./newsletter-section.module.css";

type State =
  | { kind: "idle" | "pending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function NewsletterSection() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState({ kind: "pending" });

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? "").trim(),
          companyWebsite: String(data.get("companyWebsite") ?? ""),
          source: "home",
        }),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string; errors?: Record<string, string> }
        | null;

      if (response.ok && result?.ok) {
        form.reset();
        setState({ kind: "success", message: "Thank you for subscribing. We’ll keep you posted." });
      } else {
        setState({
          kind: "error",
          message:
            result?.errors?.email ??
            result?.error ??
            "Something went wrong. Please try again.",
        });
      }
    } catch {
      setState({ kind: "error", message: "Network error. Please try again." });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <section className={styles.section} aria-labelledby="newsletter-title">
      <span className={styles.ornament} aria-hidden="true">✳</span>
      <p className={styles.label}>
        <span aria-hidden="true" />
        Stay connected
      </p>
      <h2 id="newsletter-title">
        Stay close to<br /><em>what endures.</em>
      </h2>
      <p className={styles.lead}>
        Subscribe to receive updates on programmes, events and the life of the Gurukulam.
      </p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate={false}>
        <label className={styles.srOnly} htmlFor="home-newsletter-email">Email address</label>
        <input
          autoComplete="email"
          id="home-newsletter-email"
          maxLength={254}
          name="email"
          placeholder="Enter your email address"
          required
          type="email"
        />
        <div className={styles.honeypot} aria-hidden="true">
          <input autoComplete="off" name="companyWebsite" tabIndex={-1} type="text" />
        </div>
        <button disabled={state.kind === "pending"} type="submit">
          {state.kind === "pending" ? "Subscribing…" : "Subscribe →"}
        </button>
      </form>

      <div className={styles.status} aria-live="polite">
        {state.kind === "success" && <p className={styles.success}>{state.message}</p>}
        {state.kind === "error" && <p className={styles.error}>{state.message}</p>}
      </div>
      <p className={styles.note}>No spam. Unsubscribe at any time.</p>
    </section>
  );
}
