import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import SiteShell from "./components/SiteShell";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prag",
  description: "Prag. Tools, products, and side projects.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${newsreader.variable} ${plex.variable} font-display`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.addEventListener("click",function(e){var t=e.target;if(!t||!t.closest)return;var a=t.closest("a");if(!a)return;var h=a.getAttribute("href");if(h==="/"||h==="/work"||h==="/writing"||h==="/prag-api"){e.preventDefault();e.stopPropagation();}},true);',
          }}
        />
        <SiteShell />
        {children}
      </body>
    </html>
  );
}
