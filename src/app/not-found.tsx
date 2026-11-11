import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#f2f7fc",
        color: "#143562",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: 620,
          width: "100%",
          padding: "2rem",
          border: "1px solid rgba(20, 53, 98, 0.15)",
          background: "#fafcfe",
          boxShadow: "0 15px 40px rgba(20, 53, 98, 0.08)",
        }}
      >
        <p style={{ color: "#306cb4", marginBottom: "1rem", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 11, fontWeight: 700 }}>
          404 · Page not found
        </p>
        <h1 style={{ fontSize: "clamp(2.3rem, 6vw, 4rem)", lineHeight: 1.1, marginBottom: "1rem", fontFamily: "Georgia, serif" }}>
          This path is not yet available.
        </h1>
        <p style={{ color: "#55657a", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          The page you are looking for may have moved, or it may not yet be part
          of this provisional website. Please return to the home page or explore
          the main sections of the trust site.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.9rem 1.4rem",
            background: "#143562",
            color: "#f2f7fc",
            borderRadius: 999,
            fontWeight: 600,
          }}
        >
          Return home
        </Link>
      </div>
    </main>
  );
}
