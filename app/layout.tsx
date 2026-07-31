import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukulurecordings.com"),
  title: {
    default: "Lukulu Recordings — Afro House from Ladysmith to the World Label from South Africa",
    template: "%s | Lukulu Recordings",
  },
  description:
    "Lukulu Recordings is an independent South African music label from Ladysmith releasing Afro House, Afro-Tech and 3-Step music for DJs, listeners and global dance floors.",
  applicationName: "Lukulu Recordings",
  keywords: [
    "Lukulu Recordings",
    "South African Afro House label",
    "Afro House record label",
    "Afro-Tech",
    "3-Step",
    "South African house music",
    "Ladysmith music",
    "DJ Nastor",
  ],
  authors: [{ name: "Lukulu Recordings" }],
  creator: "Lukulu Recordings",
  publisher: "Lukulu Recordings",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lukulu Recordings — Afro House from Ladysmith to the World",
    description:
      "Independent Afro House, Afro-Tech and 3-Step releases rooted in African rhythm, electronic pulse and global dance-floor culture.",
    url: "/",
    siteName: "Lukulu Recordings",
    images: [
      {
        url: "/assets/lukulu-textile-wordmark.jpg",
        width: 1200,
        height: 630,
        alt: "Lukulu Recordings textile wordmark",
      },
    ],
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lukulu Recordings — Afro House from Ladysmith to the World",
    description:
      "Afro House, Afro-Tech and 3-Step from Ladysmith, South Africa — rooted in African rhythm and built for global dance floors.",
    images: ["/assets/lukulu-textile-wordmark.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: {
      url: "/assets/lukulu-favicon.jpg",
      type: "image/jpeg",
      sizes: "32x32",
    },
    shortcut: "/assets/lukulu-favicon.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#120d0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
