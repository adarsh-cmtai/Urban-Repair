import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import { AppInitializer } from "@/components/AppInitializer";
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
  description:
    "Expert appliance repair, interior design, and appliance buying/selling services in Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteDown = process.env.NEXT_PUBLIC_SITE_DOWN === "true";

  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        {siteDown ? (
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg max-w-md">
              <h1 className="text-2xl font-bold text-red-600 mb-4">
                Website Temporarily Down
              </h1>
              <p className="text-gray-700 mb-6">
                Due to the lack of response from your side and the 
                pending payment, we have temporarily disabled your services.
                Please clear the outstanding dues at the earliest to resume normal operations.
              </p>
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Urban Repair
              </p>
            </div>
          </div>
        ) : (
          <ReduxProvider>
            <AppInitializer>
              <Toaster position="top-center" reverseOrder={false} />
              <Suspense fallback={null}>{children}</Suspense>
            </AppInitializer>
            <Analytics />
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}