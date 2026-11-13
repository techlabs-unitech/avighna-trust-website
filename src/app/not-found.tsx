import Link from "next/link";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";

export default function NotFound() {
  return (
    <>
      <SiteHeader activePath="/404" />
      <main id="main" style={{ display: "grid", minHeight: "60vh", placeItems: "center", padding: "4rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: 620 }}>
          <p lang="sa" style={{ color: "#a3201f", fontFamily: "var(--font-sanskrit)", fontSize: "2rem" }}>ॐ</p>
          <h1 style={{ margin: "0.5rem 0 1rem", color: "#1d2457", fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 3.6rem)", lineHeight: 1.1 }}>
            This path has not been laid yet.
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#6a5236", lineHeight: 1.7 }}>
            The page you are looking for may have moved. Return home and choose from the menu.
          </p>
          <Link href="/" style={{ display: "inline-flex", padding: "0.8rem 1.8rem", color: "#fff7e0", background: "linear-gradient(135deg,#c4301f,#8f1717)", border: "1.5px solid #e3a11c", borderRadius: "999px 999px 999px 4px", fontFamily: "var(--font-display)", fontSize: "1.15rem", fontWeight: 700 }}>
            Return home
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
