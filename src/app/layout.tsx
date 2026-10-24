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

const siteTitle = "Pragalvha Sharma";
const siteDescription =
  "AI Operations Engineering Intern at Opendoor. Computer Science at Western and business at Ivey. Won the xAI Hackathon with GrokHunt and placed 1st globally in the NASA/NSS Space Settlement Contest.";

// These tags control the preview card that LinkedIn, iMessage, X, and Slack show when the
// link is shared. Without them, LinkedIn guesses from the page body and picks a random post.
// og:video makes iMessage play a short looping version of the card instead of the still image.
// Both files come from scripts/og-video.html; regenerate them with scripts/render-og-video.mjs.
const siteUrl = "https://www.pragalvha.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName: siteTitle,
    title: siteTitle,
    description: siteDescription,
    locale: "en_CA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pragalvha Sharma: AI at Opendoor, xAI Hackathon winner, 1st globally in the NASA/NSS Space Settlement Contest",
      },
    ],
    videos: [
      {
        url: `${siteUrl}/og-video.mp4`,
        secureUrl: `${siteUrl}/og-video.mp4`,
        type: "video/mp4",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    creator: "@Pragalvha",
    images: ["/og-image.png"],
  },
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
