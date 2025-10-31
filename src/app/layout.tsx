import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Steal a Brainrot - Free Online Games Platform",
  description: "Steal a Brainrot is your gateway to the best free online games with instant access to thousands of titles. No long installs or interruptions — just pick a game and play anywhere, on any device!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="dark">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
