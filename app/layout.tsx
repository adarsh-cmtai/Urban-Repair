import type React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";
import { ReduxProvider } from "@/components/ReduxProvider";
import { AppInitializer } from "@/components/AppInitializer";
import { Toaster } from "react-hot-toast";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
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

const SocialSidebar = () => {
  const socials = [
    {
      icon: FaWhatsapp,
      color: "bg-[#25D366]",
      href: "https://wa.me/918109279412",
      label: "WHATSAPP",
    },
    {
      icon: FaFacebookF,
      color: "bg-[#1877F2]",
      href: "https://www.facebook.com/share/14VfaWnjsyF/",
      label: "FACEBOOK",
    },
    {
      icon: FaInstagram,
      color: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
      href: "https://www.instagram.com/imrankhan788698?igsh=enE2c2V2NzI4em02",
      label: "INSTAGRAM",
    },
    {
      icon: FaXTwitter,
      color: "bg-black",
      href: "https://x.com/MohdImr2711594?t=5hKYTAvVxygvDpQAAkr1PA&s=09",
      label: "TWITTER",
    },
  ];

  return (
    <div className="fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`${social.color} relative flex h-14 w-48 items-center justify-start rounded-l-full text-white shadow-md transition-transform duration-300 ease-in-out translate-x-[calc(100%-3.5rem)] hover:translate-x-0 hover:shadow-2xl`}
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center">
            <social.icon className="h-7 w-7" />
          </div>
          <span className="pl-2 text-sm font-bold tracking-wider font-montserrat whitespace-nowrap">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
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
              <SocialSidebar />
              <Suspense fallback={null}>{children}</Suspense>
            </AppInitializer>
            <Analytics />
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}