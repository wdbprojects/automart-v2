import type { Metadata } from "next";
import { Mulish, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "./providers";

const mulish = Mulish({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const montserrat = Montserrat({
  weight: "variable",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoMart",
  description: "Car dealership app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased overscroll-none bg-background",
          montserrat.variable,
          mulish.variable,
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
