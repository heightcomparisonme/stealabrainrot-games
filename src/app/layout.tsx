import type { Metadata } from "next";
import Script from "next/script";
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8MTZFCXG6Z"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8MTZFCXG6Z');
          `}
        </Script>

        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
