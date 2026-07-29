import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://lukulurecordings.com"),
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_ZA", url: "https://lukulurecordings.com/", siteName: "Lukulu Recordings", title: "Lukulu Recordings | Afro House & Afro-Tech", description: "Independent Afro House, Afro-Tech and 3-Step music from Ladysmith, South Africa.", images: [{ url: "/assets/lukulu-textile-wordmark.jpg", width: 1200, height: 630, alt: "Lukulu Recordings" }] },
  twitter: { card: "summary_large_image", title: "Lukulu Recordings | Afro House & Afro-Tech", description: "Independent Afro House, Afro-Tech and 3-Step music from Ladysmith, South Africa.", images: ["/assets/lukulu-textile-wordmark.jpg"] },
  title: "Lukulu Recordings | Afro House & Afro-Tech",
  description:
    "Lukulu Recordings is a South African independent label releasing Afro House, Afro-Tech and 3-Step music from Ladysmith to the world.",
  applicationName: "Lukulu Recordings",
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
