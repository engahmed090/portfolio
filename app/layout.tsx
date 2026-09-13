import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

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
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
