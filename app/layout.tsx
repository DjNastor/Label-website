import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
