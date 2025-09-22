"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Wrench, ChevronDown, AirVent, Refrigerator, Tv, WashingMachine } from "lucide-react"

const navLinks = [
  {
    label: "Services",
    href: "/services",
    submenu: [
      { label: "AC Repair", href: "/services", icon: AirVent },
      { label: "Fridge Repair", href: "/services", icon: Refrigerator },
      { label: "TV Repair", href: "/services", icon: Tv },
      { label: "Washing Machine Repair", href: "/services", icon: WashingMachine },
    ],
  },
  { label: "Sell Appliance", href: "/sell-appliance" },
  { label: "Interiors", href: "/interiors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])
  
  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode, className?: string }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`relative text-neutral-700 hover:text-brand-red transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-brand-red after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
          isActive ? "text-brand-red after:scale-x-100" : "hover:after:scale-x-100"
        } ${className}`}
      >
        {children}
      </Link>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-2xl text-gray-900">UrbanRepair</span>
            </Link>

            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map(link =>
                link.submenu ? (
                  <div key={link.label} className="relative group">
                    <button className="flex items-center gap-1 text-neutral-700 hover:text-brand-red transition-colors duration-300">
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-gray-200/80 rounded-xl shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                      {link.submenu.map(sublink => (
                        <Link
                          key={sublink.label}
                          href={sublink.href}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-neutral-700"
                        >
                          <sublink.icon className="w-5 h-5 text-brand-red" />
                          <span>{sublink.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink key={link.label} href={link.href}>
                    {link.label}
                  </NavLink>
                )
              )}
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:9325106205" className="flex items-center gap-2 text-neutral-700 hover:text-brand-red transition-colors duration-300">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">93251 06205</span>
              </a>
              <Button className="bg-brand-red hover:bg-red-700 text-white font-semibold rounded-full px-6 shadow-md transition-all duration-300 transform hover:scale-105">
                Book a Service
              </Button>
            </div>

            <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMenuOpen(false)}></div>
        <div
          className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white p-6 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center shadow-md">
                <Wrench className="w-5 h-5 text-white" />
              </div>
              <span className="font-montserrat font-bold text-2xl text-gray-900">UrbanRepair</span>
            </Link>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map(link =>
              link.submenu ? (
                <div key={link.label}>
                  <button
                    onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                    className="w-full flex items-center justify-between py-3 text-lg font-medium text-neutral-800"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${isSubMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isSubMenuOpen && (
                    <div className="pl-4 border-l-2 border-red-100 space-y-1 mt-1">
                      {link.submenu.map(sublink => (
                        <Link
                          key={sublink.label}
                          href={sublink.href}
                          className="flex items-center gap-3 py-2 text-neutral-600 hover:text-brand-red"
                        >
                          <sublink.icon className="w-5 h-5" />
                          <span>{sublink.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`py-3 text-lg font-medium text-neutral-800 ${
                    pathname === link.href ? "text-brand-red" : ""
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col space-y-3">
              <Button className="w-full bg-brand-red hover:bg-red-700 text-white font-semibold rounded-full py-3 shadow-md">
                Book a Service
              </Button>
              <Button variant="outline" className="w-full rounded-full py-3">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}