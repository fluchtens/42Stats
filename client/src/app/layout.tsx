import { Footer } from "@/components/layouts/footer/Footer";
import { Header } from "@/components/layouts/header/header";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import * as React from "react";
import { Suspense } from "react";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "42Stats",
  description: "42Stats is the ultimate web application for 42 users to discover detailed information and statistics.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${GeistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Header />
            <Suspense>{children}</Suspense>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
