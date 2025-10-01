import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import { AuthProvider } from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Urban Repair - Your Complete Home Care Partner",
  description: "Expert appliance repair, interior design, and appliance buying/selling services in Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <ReduxProvider>
          <AuthProvider>
            <Toaster position="top-center" reverseOrder={false} />
            <Suspense fallback={null}>{children}</Suspense>
          </AuthProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}