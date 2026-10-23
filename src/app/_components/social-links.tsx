import type { ReactNode } from "react";
import { socialLinks, type SocialPlatform } from "./site-data";

const common = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const icons: Record<SocialPlatform, ReactNode> = {
  facebook: (
    <svg {...common}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  instagram: (
    <svg {...common}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
  ),
  youtube: (
    <svg {...common}><path d="M2.5 17a24.1 24.1 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.1 24.1 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
  ),
  x: (
    <svg {...common}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
  ),
  whatsapp: (
    <svg {...common}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" /><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
  ),
};

export function SocialLinks({
  className,
  linkClassName,
  label = "Social media",
}: {
  className?: string;
  linkClassName?: string;
  label?: string;
}) {
  return (
    <ul className={className} aria-label={label}>
      {socialLinks.map(({ platform, label: name, href }) => {
        const external = href.startsWith("http");
        return (
          <li key={platform}>
            <a
              aria-label={name}
              className={linkClassName}
              href={href}
              title={name}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {icons[platform]}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
