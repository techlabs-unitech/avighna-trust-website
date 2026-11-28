"use client";

import { useRef, useState, type FormEvent } from "react";
import styles from "./submission-form.module.css";

type FormType = "contact" | "admission" | "volunteer" | "newsletter";

type SubmissionState =
  | { kind: "idle" | "pending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string; fields?: Record<string, string> };

const endpoints: Record<FormType, string> = {
  contact: "/api/contact",
  admission: "/api/admission",
  volunteer: "/api/volunteer",
  newsletter: "/api/newsletter",
};

const volunteerAreas = [
  "Teaching",
  "Sanskrit promotion",
  "Temple services",
  "Events",
  "Farming",
  "Library",
  "Publications",
  "IT",
  "Media",
  "Outreach",
];

function getFieldErrors(value: unknown): Record<string, string> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return undefined;
  }

  const fields = Object.entries(value).reduce<Record<string, string>>(
    (result, [field, message]) => {
      if (typeof message === "string") result[field] = message;
      return result;
    },
    {},
  );

  return Object.keys(fields).length > 0 ? fields : undefined;
}

export function SubmissionForm({ type }: { type: FormType }) {
  const [state, setState] = useState<SubmissionState>({ kind: "idle" });
  const submitting = useRef(false);
  const isNewsletter = type === "newsletter";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedAreas = formData.getAll("interestArea").filter(
      (value): value is string => typeof value === "string",
    );

    if (type === "volunteer" && selectedAreas.length === 0) {
      setState({
        kind: "error",
        message: "Choose at least one area of interest before submitting.",
      });
      submitting.current = false;
      return;
    }

    const payload: Record<string, string> = {
      companyWebsite: String(formData.get("companyWebsite") ?? ""),
    };

    for (const [key, value] of formData.entries()) {
      if (
        key !== "companyWebsite" &&
        key !== "interestArea" &&
        key !== "volunteerNotes" &&
        typeof value === "string"
      ) {
        payload[key] = value.trim();
      }
    }
    if (type === "volunteer") {
      const notes = String(formData.get("volunteerNotes") ?? "").trim();
      payload.interests = [selectedAreas.join(", "), notes].filter(Boolean).join(" — ");
    }
    if (type === "newsletter") payload.source = "website";

    setState({ kind: "pending" });

    try {
      const response = await fetch(endpoints[type], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json().catch(() => null);
      const resultRecord =
        typeof result === "object" && result !== null && !Array.isArray(result)
          ? result as Record<string, unknown>
          : {};

      if (response.ok && resultRecord.ok === true && resultRecord.saved === true) {
        form.reset();
        setState({
          kind: "success",
          message:
            "Thank you. Your submission was saved. No email confirmation or notification is sent.",
        });
        return;
      }

      if (response.ok && resultRecord.ok === true) {
        setState({
          kind: "error",
          message:
            "We could not verify that your submission was saved. Please review the form and try again.",
        });
        return;
      }

      if (response.status === 429) {
        setState({
          kind: "error",
          message: "Too many submissions. Please wait a while and try again.",
        });
        return;
      }

      if (response.status === 503) {
        setState({
          kind: "error",
          message:
            "Submissions are temporarily unavailable because the required services are not ready. Your information was not submitted; please try again later.",
        });
        return;
      }

      if (response.status === 413) {
        setState({
          kind: "error",
          message: "This submission is too large. Please shorten your message and try again.",
        });
        return;
      }

      if (response.status === 415) {
        setState({
          kind: "error",
          message: "The submission format was not accepted. Please reload the page and try again.",
        });
        return;
      }

      const fields = getFieldErrors(resultRecord.errors);
      setState({
        kind: "error",
        message:
          response.status === 400
            ? "Please review the form fields and correct the information below."
            : "We could not submit your information. Please try again later.",
        fields,
      });
    } catch {
      setState({
        kind: "error",
        message:
          "We could not reach the submission service. Your information was not submitted; please try again later.",
      });
    } finally {
      submitting.current = false;
    }
  }

  return (
    <form
      className={`${styles.form} ${isNewsletter ? styles.newsletterForm : ""}`}
      onSubmit={handleSubmit}
      aria-busy={state.kind === "pending"}
    >
      {type !== "newsletter" && (
        <>
          <label className={styles.field}>
            <span>Full name</span>
            <input
              autoComplete="name"
              maxLength={120}
              minLength={2}
              name="name"
              required
              type="text"
            />
            {state.kind === "error" && state.fields?.name && (
              <span className={styles.fieldError}>{state.fields.name}</span>
            )}
          </label>
          <label className={styles.field}>
            <span>Email address</span>
            <input
              autoComplete="email"
              maxLength={254}
              name="email"
              required
              type="email"
            />
            {state.kind === "error" && state.fields?.email && (
              <span className={styles.fieldError}>{state.fields.email}</span>
            )}
          </label>
        </>
      )}

      {type === "contact" && (
        <>
          <label className={styles.field}>
            <span>Phone number <span className={styles.optional}>(optional)</span></span>
            <input autoComplete="tel" maxLength={32} name="phone" type="tel" />
            {state.kind === "error" && state.fields?.phone && (
              <span className={styles.fieldError}>{state.fields.phone}</span>
            )}
          </label>
          <label className={styles.field}>
            <span>Subject <span className={styles.optional}>(optional)</span></span>
            <input maxLength={200} name="subject" type="text" />
            {state.kind === "error" && state.fields?.subject && (
              <span className={styles.fieldError}>{state.fields.subject}</span>
            )}
          </label>
          <label className={styles.field}>
            <span>Message</span>
            <textarea maxLength={4000} minLength={10} name="message" required rows={5} />
            {state.kind === "error" && state.fields?.message && (
              <span className={styles.fieldError}>{state.fields.message}</span>
            )}
          </label>
        </>
      )}

      {type === "admission" && (
        <>
          <label className={styles.field}>
            <span>Phone number <span className={styles.optional}>(optional)</span></span>
            <input autoComplete="tel" maxLength={32} name="phone" type="tel" />
            {state.kind === "error" && state.fields?.phone && (
              <span className={styles.fieldError}>{state.fields.phone}</span>
            )}
          </label>
          <label className={styles.field}>
            <span>Programme interest</span>
            <input maxLength={200} minLength={2} name="programmeInterest" required type="text" />
            {state.kind === "error" && state.fields?.programmeInterest && (
              <span className={styles.fieldError}>{state.fields.programmeInterest}</span>
            )}
          </label>
          <label className={styles.field}>
            <span>Message</span>
            <textarea maxLength={4000} minLength={10} name="message" required rows={5} />
            {state.kind === "error" && state.fields?.message && (
              <span className={styles.fieldError}>{state.fields.message}</span>
            )}
          </label>
        </>
      )}

      {type === "volunteer" && (
        <>
          <fieldset className={styles.choiceGroup}>
            <legend>Areas of interest <span>(choose at least one)</span></legend>
            <div className={styles.choiceGrid}>
              {volunteerAreas.map((area) => (
                <label className={styles.choiceOption} key={area}>
                  <input name="interestArea" type="checkbox" value={area} />
                  <span>{area}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className={styles.field}>
            <span>Additional notes <span className={styles.optional}>(optional)</span></span>
            <textarea
              maxLength={4000}
              name="volunteerNotes"
              placeholder="Share relevant experience or anything else you would like us to know."
              rows={4}
            />
          </label>
        </>
      )}

      {isNewsletter && (
        <label className={styles.field}>
          <span>Email address</span>
          <input
            autoComplete="email"
            maxLength={254}
            name="email"
            required
            type="email"
          />
          {state.kind === "error" && state.fields?.email && (
            <span className={styles.fieldError}>{state.fields.email}</span>
          )}
        </label>
      )}

      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Company website
          <input
            autoComplete="off"
            name="companyWebsite"
            tabIndex={-1}
            type="text"
          />
        </label>
      </div>

      <button className={styles.submit} disabled={state.kind === "pending"} type="submit">
        {state.kind === "pending"
          ? "Submitting…"
          : isNewsletter
            ? "Subscribe"
            : type === "volunteer"
              ? "Submit interest"
              : "Send enquiry"}
      </button>

      {state.kind === "success" && (
        <p className={styles.success} role="status">{state.message}</p>
      )}
      {state.kind === "error" && (
        <p className={styles.error} role="alert">
          {state.message}
          {state.fields && (
            <span className={styles.errorList}>
              {Object.entries(state.fields).map(([field, message]) => (
                <span key={field}>{field}: {message}</span>
              ))}
            </span>
          )}
        </p>
      )}
    </form>
  );
}
