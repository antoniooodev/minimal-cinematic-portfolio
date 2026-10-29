import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Letterbox } from "@/components/effects/Letterbox";
import { RevealObserver } from "@/components/effects/RevealObserver";
import { Header } from "@/components/layout/Header";
import { profile } from "@/content/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0a09",
};

// Runs before the first paint and flags that JavaScript is on, so scroll
// reveals and the opening letterbox only apply when they can play.
const bootScript = `document.documentElement.classList.add("js")`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body id="top">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <Letterbox />
        <Header />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
