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
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
  }, [isMenuOpen])

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`relative text-base font-medium text-slate-700 transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-red-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${
          isActive ? "text-red-600 after:scale-x-100" : "hover:after:scale-x-100"
        }`}
      >
        {children}
      </Link>
    )
  }

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
      <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-md shadow-red-500/20">
        <Wrench className="w-5 h-5 text-white" />
      </div>
      <span className="font-bold text-2xl text-gray-900 tracking-tight">UrbanRepair</span>
    </Link>
  )

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <nav className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) =>
                link.submenu ? (
                  <div key={link.label} className="relative group">
                    <button className="flex items-center gap-1 text-base font-medium text-slate-700 transition-colors duration-300 hover:text-red-600 focus:outline-none">
                      {link.label}
                      <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:scale-100 scale-95 origin-top">
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
                      {link.submenu.map((sublink) => (
                        <Link key={sublink.label} href={sublink.href} className="flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors">
                          <sublink.icon className="w-5 h-5 text-red-600" />
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

            <div className="hidden lg:flex items-center space-x-5">
              <a href="tel:9325106205" className="group flex items-center gap-2 text-slate-700 transition-colors duration-300 hover:text-red-600">
                <Phone className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[12deg]" />
                <span className="font-semibold">93251 06205</span>
              </a>
              <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 shadow-md shadow-red-500/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                Book a Service
              </Button>
            </div>

            <button className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white p-6 shadow-xl transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) =>
              link.submenu ? (
                <div key={link.label}>
                  <button onClick={() => setOpenSubMenu(openSubMenu === link.label ? null : link.label)} className="w-full flex items-center justify-between py-3 text-lg font-medium text-slate-800">
                    <span>{link.label}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openSubMenu === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${openSubMenu === link.label ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-4 border-l-2 border-red-100 space-y-1 py-2">
                      {link.submenu.map((sublink) => (
                        <Link key={sublink.label} href={sublink.href} className="flex items-center gap-3 py-2.5 text-slate-600 rounded-md hover:text-red-600 hover:bg-red-50/50 px-2">
                          <sublink.icon className="w-5 h-5 text-red-500" />
                          <span>{sublink.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className={`block py-3 text-lg font-medium text-slate-800 rounded-md px-2 ${pathname === link.href ? "text-red-600 bg-red-50/50" : "hover:bg-slate-50"}`}>
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col space-y-4">
              <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full py-3">
                Book a Service
              </Button>
              <Button size="lg" variant="outline" className="w-full rounded-full py-3" asChild>
                <a href="tel:9325106205">
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}