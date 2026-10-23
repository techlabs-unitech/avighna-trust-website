"use client";

import { useState } from "react";
import styles from "./site-interactions.module.css";

const categories = [
  "Annadanam",
  "Vidyadanam",
  "GoSeva",
  "Veda Rakshana",
  "Temple Development",
  "General Donation",
];

const suggestedAmounts = ["500", "1000", "2500"];

export function DonationSelector() {
  const [category, setCategory] = useState("General Donation");
  const [amount, setAmount] = useState("1000");

  return (
    <div className={styles.donationPanel}>
      <fieldset className={styles.donationGroup}>
        <legend>Choose a purpose</legend>
        <div className={styles.categoryGrid}>
          {categories.map((item) => (
            <button
              aria-pressed={category === item}
              className={styles.categoryButton}
              key={item}
              onClick={() => setCategory(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.donationGroup}>
        <legend>Explore an amount</legend>
        <div className={styles.amountChoices}>
          {suggestedAmounts.map((value) => (
            <button
              aria-pressed={amount === value}
              className={styles.amountButton}
              key={value}
              onClick={() => setAmount(value)}
              type="button"
            >
              ₹{Number(value).toLocaleString("en-IN")}
            </button>
          ))}
        </div>
        <label className={styles.customAmount}>
          Custom amount (INR)
          <input
            aria-label="Custom illustrative amount in Indian rupees"
            inputMode="numeric"
            min="1"
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Enter an amount"
            type="number"
            value={amount}
          />
        </label>
        <p aria-live="polite">
          Selected for consideration: {category} · ₹{amount ? Number(amount).toLocaleString("en-IN") : "0"}
        </p>
      </fieldset>

      <fieldset className={styles.donationGroup} disabled>
        <legend>Donor details</legend>
        <p>
          These fields are shown for layout planning only and are inactive.
          Please do not enter personal information.
        </p>
        <div className={styles.donorFields}>
          <label className={styles.donorField}>
            Full name
            <input autoComplete="name" disabled placeholder="Unavailable until payment setup is verified" />
          </label>
          <label className={styles.donorField}>
            Email address
            <input autoComplete="email" disabled placeholder="Unavailable until payment setup is verified" type="email" />
          </label>
        </div>
      </fieldset>
      <p className={styles.inactiveNotice}>
        Payment is not enabled. This page does not collect or transmit donor or
        payment information, accept contributions, or create a donation record.
        Selected purpose and amount are only an on-page preview.
      </p>
    </div>
  );
}
