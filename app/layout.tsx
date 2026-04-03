import type { Metadata } from "next";
import {
  Audiowide,
  Cinzel_Decorative,
  DM_Sans,
  Fraunces,
  Inter,
  Manrope,
  Outfit,
  Playfair_Display,
  Poppins,
  Sora,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["700"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "CHANDHAN PORTFOLIO",
  description: "A modern portfolio built with Next.js, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} ${outfit.variable} ${poppins.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} ${fraunces.variable} ${sora.variable} ${dmSans.variable} ${cinzelDecorative.variable} ${audiowide.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
