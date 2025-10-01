"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Wrench } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { logout } from "@/store/authSlice"
import { toast } from "react-hot-toast";
import { getCategories } from "@/services/publicService"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const categoriesRes = await getCategories();
        const serviceSubmenu = categoriesRes.data.map((cat: any) => ({
          label: cat.name,
          href: `/services#${cat._id}`,
          icon: Wrench,
        }));

        setNavLinks([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services", submenu: serviceSubmenu },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Blog", href: "/blog" }
        ]);
      } catch (error) {
        console.error("Failed to fetch categories for nav:", error);
        setNavLinks([
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Blog", href: "/blog" }
        ]);
      }
    };
    fetchNavData();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
  }, [isMenuOpen])
  
  const getDashboardLink = () => {
    if (!user) return "/login";
    switch(user.role) {
      case 'admin': return '/admin/dashboard';
      case 'technician': return '/technician';
      case 'customer': return '/customer';
      default: return '/';
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    toast.success('Logged out successfully');
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const isActive = pathname === href
    return (
      <Link
        href={href}
        className={`relative text-base font-medium text-gray-600 transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-red-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 ${isActive ? "text-red-600 after:scale-x-100" : "hover:after:scale-x-100"}`}
      >
        {children}
      </Link>
    )
  }

  const Logo = () => (
    <Link href="/" className="flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
      <img
        src="/Logo-1.png"
        alt="UrbanRepair Logo"
        className="h-28 w-28 object-contain"
      />
    </Link>
  )

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-200/80 shadow-sm" : "bg-transparent py-2"}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />

            <div className="hidden lg:flex items-center gap-10">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) =>
                  link.submenu && link.submenu.length > 0 ? (
                    <div key={link.label} className="relative group">
                      <Link href={link.href} className="flex items-center gap-1 text-base font-medium text-gray-600 transition-colors duration-300 hover:text-red-600 focus:outline-none">
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      </Link>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:scale-100 scale-95 origin-top">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 h-4 w-4 bg-white rotate-45 ring-1 ring-black ring-opacity-5"></div>
                        {link.submenu.map((sublink: any) => (
                          <Link key={sublink.label} href={sublink.href} className="relative z-10 flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-red-50 transition-colors">
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
              <div className="flex items-center gap-3">
                {isAuthenticated ? (
                  <>
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 shadow-md transition-all">
                      <Link href={getDashboardLink()}>Dashboard</Link>
                    </Button>
                    <Button variant="outline" onClick={handleLogout} className="font-semibold rounded-full px-6">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="font-semibold rounded-full px-6">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full px-6 shadow-md transition-all">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <button className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
        <div className={`absolute top-0 left-0 h-full w-full max-w-sm bg-white p-6 shadow-xl transition-transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="flex items-center justify-between mb-8">
            <Logo />
            <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-md hover:bg-slate-100">
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) =>
              link.submenu && link.submenu.length > 0 ? (
                <div key={link.label}>
                  <button onClick={() => setOpenSubMenu(openSubMenu === link.label ? null : link.label)} className="w-full flex items-center justify-between py-3 text-lg font-medium">
                    <span>{link.label}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openSubMenu === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`overflow-hidden transition-[max-height] duration-500 ${openSubMenu === link.label ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-4 border-l-2 border-red-100 space-y-1 py-2">
                      {link.submenu.map((sublink: any) => (
                        <Link key={sublink.label} href={sublink.href} className="flex items-center gap-3 py-2.5 rounded-md px-2">
                          <sublink.icon className="w-5 h-5 text-red-500" />
                          <span>{sublink.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={link.label} href={link.href} className={`block py-3 text-lg font-medium rounded-md px-2 ${pathname === link.href ? "text-red-600" : ""}`}>
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-gray-200 mt-6 pt-6 flex flex-col space-y-4">
               {isAuthenticated ? (
                  <>
                    <Button size="lg" asChild className="w-full bg-red-600 text-white rounded-full py-3">
                      <Link href={getDashboardLink()}>Go to Dashboard</Link>
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleLogout} className="w-full rounded-full py-3">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                     <Button size="lg" asChild className="w-full bg-red-600 text-white rounded-full py-3">
                       <Link href="/register">Sign Up Free</Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild className="w-full rounded-full py-3">
                       <Link href="/login">Log In</Link>
                    </Button>
                  </>
                )}
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}