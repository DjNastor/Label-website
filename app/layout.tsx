import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lukulu Recordings | Afro House & Afro-Tech",
  description:
    "Lukulu Recordings is a South African independent label releasing Afro House, Afro-Tech and 3-Step music from Ladysmith to the world.",
  other: {
    "codex-preview": "development",
  },
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
