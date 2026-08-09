import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ahmed Othman Qadir · Engineering Terminal",
  description:
    "Spatial data-terminal portfolio — RF engineering, AI sensing, embedded hardware. Communication Engineer, Sulaimani Polytechnic University.",
  authors: [{ name: "Ahmed Othman Qadir" }],
  keywords: [
    "Ahmed Othman Qadir",
    "Communication Engineer",
    "RF Engineering",
    "Antenna Engineering",
    "Metamaterial Absorber",
    "CST Studio",
    "Sulaimani Polytechnic University",
    "AI Systems",
    "Embedded Systems",
    "Kurdistan",
    "Anti-Drone",
    "NanoHerbalAI",
  ],
  openGraph: {
    title: "Ahmed Othman Qadir · Engineering Terminal",
    description: "RF + AI engineering portfolio — research terminal interface.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
