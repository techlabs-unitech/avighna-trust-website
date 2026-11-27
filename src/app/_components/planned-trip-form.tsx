"use client";

import { useRef, useState, type FormEvent } from "react";
import { paymentEnabled, startPayment } from "@/lib/payment";
import { downloadTripPdf, type TripSummary } from "@/lib/planned-trip-pdf";
import { tripDarshan, tripGenders, tripGuide, tripModes, tripPlaceGroups } from "@/lib/planned-trip";
import styles from "./planned-trip-form.module.css";

type State =
  | { kind: "idle" | "pending" }
  | { kind: "error"; message: string; fields?: Record<string, string> };

/** Steps: fill in the form → review (Edit / Confirm) → confirmed (download the PDF, payment later). */
type Step = "form" | "review" | "done";

type Payload = {
  companyWebsite: string;
  name: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  days: string;
  address: string;
  elders: string;
  kids: string;
  places: string[];
  travelGuide: string;
  travelMode: string;
  darshanType: string;
};

function fieldErrors(value: unknown): Record<string, string> | undefined {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return undefined;
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(value)) if (typeof v === "string") out[k] = v;
  return Object.keys(out).length ? out : undefined;
}

/**
 * Planned Trips request form: contact info, age, gender, number of days, address, number of elders and
 * kids, places to visit (several can be chosen), travel guide yes/no, mode of travel and type of darshan.
 */
export function PlannedTripForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [step, setStep] = useState<Step>("form");
  const [payload, setPayload] = useState<Payload | null>(null);
  const [reference, setReference] = useState("");
  const [pdfNote, setPdfNote] = useState("");
  const busy = useRef(false);
  const top = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const err = (name: string) => (state.kind === "error" && state.fields?.[name] ? <span className={styles.fieldError}>{state.fields[name]}</span> : null);
  const scrollTop = () => requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: "smooth", block: "start" }));

  /** Step 1 → 2: collect the answers and show them for review. Nothing is sent yet. */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const text = (k: string) => String(data.get(k) ?? "").trim();
    const places = data.getAll("places").filter((v): v is string => typeof v === "string");

    if (places.length === 0) {
      setState({ kind: "error", message: "Please choose at least one place you wish to visit.", fields: { places: "Choose at least one place." } });
      return;
    }
    setPayload({
      companyWebsite: text("companyWebsite"),
      name: text("name"),
      phone: text("phone"),
      email: text("email"),
      age: text("age"),
      gender: text("gender"),
      days: text("days"),
      address: text("address"),
      elders: text("elders"),
      kids: text("kids"),
      places,
      travelGuide: text("travelGuide"),
      travelMode: text("travelMode"),
      darshanType: text("darshanType"),
    });
    setState({ kind: "idle" });
    setStep("review");
    scrollTop();
  }

  function pdfFor(p: Payload, ref: string): TripSummary {
    return {
      reference: ref,
      submittedOn: new Date().toLocaleString("en-IN", { dateStyle: "long", timeStyle: "short" }),
      name: p.name,
      phone: p.phone,
      email: p.email,
      address: p.address,
      age: p.age,
      gender: p.gender,
      elders: p.elders,
      kids: p.kids,
      days: p.days,
      places: p.places,
      travelGuide: p.travelGuide,
      travelMode: p.travelMode,
      darshanType: p.darshanType,
    };
  }

  async function savePdf(p: Payload, ref: string) {
    try {
      await downloadTripPdf(pdfFor(p, ref));
      setPdfNote("Your PDF has been downloaded.");
    } catch {
      setPdfNote("We could not create the PDF automatically. Please press “Download PDF” to try again.");
    }
  }

  /** Step 2 → 3: save the request, then download the PDF. */
  async function confirm() {
    if (busy.current || !payload) return;
    busy.current = true;
    setState({ kind: "pending" });
    try {
      const res = await fetch("/api/planned-trip", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body: unknown = await res.json().catch(() => null);
      const rec = typeof body === "object" && body !== null && !Array.isArray(body) ? (body as Record<string, unknown>) : {};

      if (res.ok && rec.ok === true && rec.saved === true && typeof rec.reference === "string") {
        setReference(rec.reference);
        setState({ kind: "idle" });
        setStep("done");
        scrollTop();
        await savePdf(payload, rec.reference);
      } else if (res.status === 400) {
        setStep("form");
        setState({ kind: "error", message: "Some details need correcting. Please review the highlighted fields.", fields: fieldErrors(rec.errors) });
        scrollTop();
      } else if (res.status === 429) {
        setState({ kind: "error", message: "Too many submissions. Please wait a while and try again." });
      } else if (res.status === 503) {
        setState({ kind: "error", message: "Requests are temporarily unavailable. Your information was not submitted; please try again later." });
      } else {
        setState({ kind: "error", message: "We could not submit your request. Please try again later." });
      }
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Your information was not submitted; please try again later." });
    } finally {
      busy.current = false;
    }
  }

  function startOver() {
    formRef.current?.reset();
    setPayload(null);
    setReference("");
    setPdfNote("");
    setState({ kind: "idle" });
    setStep("form");
    scrollTop();
  }

  async function pay() {
    const result = await startPayment({ reference });
    if (result.status === "started") window.location.assign(result.checkoutUrl);
  }

  const radios = (name: string, options: readonly string[]) => (
    <div className={styles.radioRow}>
      {options.map((o) => (
        <label className={styles.choice} key={o}>
          <input name={name} required type="radio" value={o} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div ref={top} className={styles.flow}>
      <ol aria-label="Progress" className={styles.steps}>
        {(["Your details", "Review", "Confirmed"] as const).map((label, i) => {
          const n = step === "form" ? 0 : step === "review" ? 1 : 2;
          return (
            <li aria-current={i === n ? "step" : undefined} data-done={i < n || undefined} data-on={i === n || undefined} key={label}>
              <span>{i + 1}</span>
              {label}
            </li>
          );
        })}
      </ol>

      {step === "review" && payload && (
        <section aria-labelledby="review-title" className={styles.review}>
          <h3 id="review-title">Please review your request</h3>
          <p className={styles.reviewIntro}>Check the details below. Choose <strong>Edit</strong> to change anything, or <strong>Confirm</strong> to send the request and download your PDF.</p>
          <dl className={styles.summary}>
            <div><dt>Name</dt><dd>{payload.name}</dd></div>
            <div><dt>Phone</dt><dd>{payload.phone}</dd></div>
            <div><dt>Email</dt><dd>{payload.email}</dd></div>
            <div className={styles.wide}><dt>Address</dt><dd>{payload.address}</dd></div>
            <div><dt>Age</dt><dd>{payload.age}</dd></div>
            <div><dt>Gender</dt><dd>{payload.gender}</dd></div>
            <div><dt>Number of elders</dt><dd>{payload.elders}</dd></div>
            <div><dt>Number of kids</dt><dd>{payload.kids}</dd></div>
            <div><dt>Number of days</dt><dd>{payload.days}</dd></div>
            <div className={styles.wide}><dt>Travelling places</dt><dd>{payload.places.join(", ")}</dd></div>
            <div><dt>Travel guide needed</dt><dd>{payload.travelGuide}</dd></div>
            <div><dt>Travel mode</dt><dd>{payload.travelMode}</dd></div>
            <div><dt>Type of darshan</dt><dd>{payload.darshanType}</dd></div>
          </dl>
          <div className={styles.actions}>
            <button className={styles.ghost} disabled={state.kind === "pending"} onClick={() => { setState({ kind: "idle" }); setStep("form"); scrollTop(); }} type="button">
              Edit
            </button>
            <button className={styles.submit} disabled={state.kind === "pending"} onClick={confirm} type="button">
              {state.kind === "pending" ? "Confirming…" : "Confirm"}
            </button>
          </div>
          {state.kind === "error" && (
            <p className={styles.error} role="alert">
              {state.message}
            </p>
          )}
        </section>
      )}

      {step === "done" && payload && (
        <section aria-labelledby="done-title" className={styles.done}>
          <h3 id="done-title">Your trip request is confirmed</h3>
          <p className={styles.ref}>
            Reference number <strong>{reference}</strong>
          </p>
          <p className={styles.reviewIntro}>
            Thank you. The Trust’s office will review your request and contact you with an itinerary, dates and costs. Keep your reference number for all communication.
          </p>
          <div className={styles.actions}>
            <button className={styles.submit} onClick={() => savePdf(payload, reference)} type="button">
              Download PDF
            </button>
            <button className={styles.ghost} onClick={startOver} type="button">
              Plan another trip
            </button>
          </div>
          {pdfNote && (
            <p className={styles.success} role="status">
              {pdfNote}
            </p>
          )}

          <div className={styles.payment}>
            <h4>Payment</h4>
            <p>Online payment is not available yet — no amount has been charged. When it opens, you will be able to pay for this trip here using your reference number.</p>
            <button className={styles.ghost} disabled={!paymentEnabled} onClick={pay} type="button">
              {paymentEnabled ? "Pay now" : "Pay now (coming soon)"}
            </button>
          </div>
        </section>
      )}

    <form aria-busy={state.kind === "pending"} className={styles.form} hidden={step !== "form"} noValidate={false} onSubmit={onSubmit} ref={formRef}>
      <fieldset className={styles.group}>
        <legend>Contact information</legend>
        <div className={styles.grid3}>
          <label className={styles.field}>
            <span>Full name</span>
            <input autoComplete="name" maxLength={120} minLength={2} name="name" required type="text" />
            {err("name")}
          </label>
          <label className={styles.field}>
            <span>Phone number</span>
            <input autoComplete="tel" maxLength={32} name="phone" required type="tel" />
            {err("phone")}
          </label>
          <label className={styles.field}>
            <span>Email address</span>
            <input autoComplete="email" maxLength={254} name="email" required type="email" />
            {err("email")}
          </label>
        </div>
        <label className={styles.field}>
          <span>Address</span>
          <textarea autoComplete="street-address" maxLength={500} minLength={5} name="address" required rows={3} />
          {err("address")}
        </label>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Who is travelling</legend>
        <div className={styles.grid4}>
          <label className={styles.field}>
            <span>Age</span>
            <input inputMode="numeric" max={120} min={1} name="age" required type="number" />
            {err("age")}
          </label>
          <label className={styles.field}>
            <span>Gender</span>
            <select defaultValue="" name="gender" required>
              <option disabled value="">
                Select
              </option>
              {tripGenders.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {err("gender")}
          </label>
          <label className={styles.field}>
            <span>Number of elders</span>
            <input defaultValue={0} inputMode="numeric" max={100} min={0} name="elders" required type="number" />
            {err("elders")}
          </label>
          <label className={styles.field}>
            <span>Number of kids</span>
            <input defaultValue={0} inputMode="numeric" max={100} min={0} name="kids" required type="number" />
            {err("kids")}
          </label>
        </div>
        <div className={styles.grid4}>
          <label className={styles.field}>
            <span>Number of days</span>
            <input inputMode="numeric" max={90} min={1} name="days" required type="number" />
            {err("days")}
          </label>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>
          Travelling places <small>(choose one or more)</small>
        </legend>
        {err("places")}
        <div className={styles.regions}>
          {tripPlaceGroups.map((g) => (
            <div className={styles.region} key={g.region}>
              <p>{g.region}</p>
              <div className={styles.placeGrid}>
                {g.places.map((p) => (
                  <label className={styles.choice} key={p}>
                    <input name="places" type="checkbox" value={p} />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend>Travel preferences</legend>
        <div className={styles.prefs}>
          <div className={styles.pref}>
            <p>Travel guide needed?</p>
            {radios("travelGuide", tripGuide)}
            {err("travelGuide")}
          </div>
          <div className={styles.pref}>
            <p>Type of darshan</p>
            {radios("darshanType", tripDarshan)}
            {err("darshanType")}
          </div>
          <div className={`${styles.pref} ${styles.prefWide}`}>
            <p>Travel mode</p>
            {radios("travelMode", tripModes)}
            {err("travelMode")}
          </div>
        </div>
      </fieldset>

      <div aria-hidden="true" className={styles.honeypot}>
        <label>
          Company website
          <input autoComplete="off" name="companyWebsite" tabIndex={-1} type="text" />
        </label>
      </div>

      <button className={styles.submit} type="submit">
        Review your request
      </button>

      {state.kind === "error" && (
        <p className={styles.error} role="alert">
          {state.message}
        </p>
      )}
    </form>
    </div>
  );
}
