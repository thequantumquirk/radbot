import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Gooey Chatbot",
  description: "The universal chat bot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="lg:overflow-hidden">
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body className={plusJakarta.className}>{children}</body>
    </html>
  );
}
