import styles from "./chatbot-placeholder.module.css";

/**
 * Wireframe placeholder for the FAQ chatbot.
 * Intentionally non-interactive: swap this for the real widget when the bot is built.
 */
export function ChatbotPlaceholder() {
  return (
    <div
      className={styles.fab}
      role="img"
      aria-label="Chat assistant icon (placeholder, not yet active)"
      title="Chat assistant (coming soon)"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.6A8 8 0 1 1 21 12z" />
        <circle cx="9" cy="12" r="0.8" fill="currentColor" />
        <circle cx="12.5" cy="12" r="0.8" fill="currentColor" />
        <circle cx="16" cy="12" r="0.8" fill="currentColor" />
      </svg>
    </div>
  );
}
