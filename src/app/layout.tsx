import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PixelWorld } from "@/components/background/PixelWorld";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { SITE } from "@/constants/site";
import "./globals.css";

/* ==========================================================================
   TYPEFACES

   Both are self-hosted and subset to the characters this site actually uses.
   That removes a third-party request from the critical path, guarantees the
   build works offline, and brings all three files in at roughly 37 KB.
   Licences ship alongside them in `src/app/fonts/`.
   ========================================================================== */

/* Display: a true bitmap face. Headings, navigation, badges and buttons only —
   body copy never touches it, because a 5x7 grid is not a reading face. */
const silkscreen = localFont({
  src: [
    { path: "./fonts/silkscreen-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/silkscreen-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-silkscreen",
  // Sized so the fallback occupies almost the same box, keeping layout shift
  // near zero during the swap.
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

/* Body: monospaced, so it stays in the same world as the display face, but
   with real lowercase rhythm and open counters — comfortable at length. */
const jetbrains = localFont({
  src: [{ path: "./fonts/jetbrains-mono-var.woff2", weight: "400 500", style: "normal" }],
  display: "swap",
  variable: "--font-jetbrains",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "Kushal Chordia",
    "Product Manager",
    "IIT Madras",
    "E-Cell",
    "Kotak Securities",
    "Inter IIT Tech Meet",
    "Portfolio",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070B1A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${silkscreen.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        {/* First tab stop on the page. */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:border focus:border-primary focus:bg-void focus:px-4 focus:py-2.5 focus:font-pixel focus:text-sm focus:text-primary"
        >
          Skip to content
        </a>

        <PixelWorld />

        <SmoothScrollProvider>
          <Navbar />
          <main id="content" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
