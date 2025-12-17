"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialSidebar = () => {
  const pathname = usePathname();

  const hiddenRoutes = ["/admin", "/technician", "/customer"];
  const shouldHide = hiddenRoutes.some((route) => pathname.startsWith(route));

  if (shouldHide) return null;

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
          className={`${social.color} relative flex h-10 w-40 items-center justify-start rounded-l-full text-white shadow-md transition-transform duration-300 ease-in-out translate-x-[calc(100%-2.5rem)] hover:translate-x-0 hover:shadow-xl`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <social.icon className="h-5 w-5" />
          </div>
          <span className="pl-2 text-xs font-bold tracking-wider font-montserrat whitespace-nowrap">
            {social.label}
          </span>
        </a>
      ))}
    </div>
  );
};

export default SocialSidebar;