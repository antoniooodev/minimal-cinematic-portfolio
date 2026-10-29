import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Cursor } from "@/components/effects/Cursor";
import { RevealObserver } from "@/components/effects/RevealObserver";
import { ScrollProgress } from "@/components/effects/ScrollProgress";
import { SpotlightTracker } from "@/components/effects/SpotlightTracker";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
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
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s — ${profile.name}`,
  },
  description: profile.intro,
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0c" },
  ],
};

// Runs before the first paint: applies the stored or system theme without a
// flash, and flags that JavaScript is on so scroll reveals can start hidden.
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}d.dataset.theme=t}catch(e){}})()`;

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
        <ScrollProgress />
        <Header />
        <main id="content">{children}</main>
        <Footer />
        <CommandPalette />
        <Cursor />
        <RevealObserver />
        <SpotlightTracker />
      </body>
    </html>
  );
}
