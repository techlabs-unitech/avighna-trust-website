"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import styles from "./site-interactions.module.css";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function subscribeToNoChanges() {
  return () => undefined;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getTodayKey() {
  return dateKey(new Date());
}

function getServerDateKey() {
  return "";
}

export function EventsCalendar() {
  const todayKey = useSyncExternalStore(
    subscribeToNoChanges,
    getTodayKey,
    getServerDateKey,
  );
  const [selectedDateOverride, setSelectedDateOverride] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const selectedDate = selectedDateOverride ?? todayKey;
  const [year, monthNumber] = (todayKey || "2000-01-01").split("-").map(Number);
  const month = useMemo(
    () => new Date(year, monthNumber - 1 + monthOffset, 1),
    [year, monthNumber, monthOffset],
  );
  const cells = useMemo(() => {
    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = new Date(firstDay);
    start.setDate(1 - firstDay.getDay());
    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [month]);
  const monthLabel = todayKey
    ? new Intl.DateTimeFormat("en", {
        month: "long",
        year: "numeric",
      }).format(month)
    : "Event calendar";
  const selectedLabel = selectedDate
    ? new Intl.DateTimeFormat("en", {
        dateStyle: "long",
      }).format(new Date(`${selectedDate}T12:00:00`))
    : "Select a date";

  function changeMonth(delta: -1 | 1) {
    setMonthOffset((current) => current + delta);
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <h3 aria-live="polite">{monthLabel}</h3>
        <div className={styles.calendarNav}>
          <button
            aria-label="Previous month"
            className={styles.calendarButton}
            onClick={() => changeMonth(-1)}
            type="button"
          >
            ←
          </button>
          <button
            aria-label="Next month"
            className={styles.calendarButton}
            onClick={() => changeMonth(1)}
            type="button"
          >
            →
          </button>
        </div>
      </div>
      <div aria-label={`${monthLabel} event calendar`} className={styles.calendarGrid} role="grid">
        {weekdays.map((day) => (
          <span className={styles.weekday} key={day} role="columnheader">{day}</span>
        ))}
        {todayKey && cells.map((date) => {
          const key = dateKey(date);
          const isCurrentMonth = date.getMonth() === month.getMonth();
          return (
            <span className={`${styles.dayCell} ${!isCurrentMonth ? styles.dayOutside : ""}`} key={key} role="gridcell">
              <button
                aria-label={new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(date)}
                aria-pressed={key === selectedDate}
                onClick={() => setSelectedDateOverride(key)}
                type="button"
              >
                {date.getDate()}
              </button>
            </span>
          );
        })}
      </div>
      <p aria-live="polite" className={styles.calendarNote}>
        {todayKey
          ? `${selectedLabel}: no confirmed Trust events or registration openings have been supplied. Dates on this calendar are for navigation only.`
          : "The current month calendar is loading. No confirmed Trust events or registration openings have been supplied."}
      </p>
    </div>
  );
}
