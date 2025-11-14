"use client"

import { useState, useEffect, Fragment } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, Wrench, MapPin, ArrowRight } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { logout } from "@/store/authSlice"
import { toast } from "react-hot-toast"
import { getCategories } from "@/services/publicService"
import { LocationModal } from "@/components/LocationModal"
import { Dialog, Transition } from '@headlessui/react'

function LocationChanger({ inMobileMenu = false }: { inMobileMenu?: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { selectedLocation } = useSelector((state: RootState) => state.location);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
        <div className={`flex items-center gap-2 text-sm font-semibold rounded-full px-4 py-2 animate-pulse ${inMobileMenu ? 'bg-slate-100 w-full' : 'bg-white'}`}>
            <MapPin className="w-4 h-4 text-slate-400" />
            <span className="truncate max-w-[150px] h-5 w-24 bg-slate-200 rounded-md"></span>
        </div>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center gap-2 text-sm font-semibold transition-colors duration-300 rounded-full px-4 py-2.5 group ${
          inMobileMenu 
            ? 'w-full bg-slate-100 text-slate-700 hover:bg-slate-200' 
            : 'bg-white text-slate-800 hover:bg-red-50 hover:text-red-700'
        }`}
      >
        <MapPin className="w-5 h-5 text-red-600" />
        <span className="truncate max-w-[180px] text-left">
          {selectedLocation ? `${selectedLocation.areaName}, ${selectedLocation.pincode}` : "Select Location"}
        </span>
        <ChevronDown className="w-4 h-4 flex-shrink-0 text-slate-400 group-hover:text-red-600" />
      </button>
      <LocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

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
          { label: "Sell Appliance", href: "/sell" },
          { label: "About Us", href: "/about" },
          { label: "Contact", href: "/contact" },
        ]);
      } catch (error) {
        console.error("Failed to fetch categories for nav:", error);
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
    const isActive = pathname === href;
    return (
      <Link href={href} className={`relative text-base font-semibold text-slate-600 transition-colors duration-300 hover:text-red-600 after:content-[''] after:absolute after:left-0 after:-bottom-1.5 after:h-0.5 after:w-full after:bg-red-600 after:scale-x-0 after:origin-left after:transition-transform ${isActive ? "text-red-600 after:scale-x-100" : "hover:after:scale-x-100"}`}>
        {children}
      </Link>
    )
  }

  const Logo = () => (
    <Link href="/" className="flex-shrink-0">
      <img src="/Logo-2.jpg" alt="UrbanRepair Logo" className="h-16 w-auto object-contain rounded-2xl mt-1" />
    </Link>
  )

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md h-20" : "bg-transparent h-24"}`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-6">
              <Logo />
            </div>
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) =>
                  link.submenu && link.submenu.length > 0 ? (
                    <div key={link.label} className="relative group">
                      <span className="flex items-center gap-1 text-base font-semibold text-slate-600 hover:text-red-600 cursor-pointer">
                        {link.label}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      </span>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-white rounded-xl shadow-lg p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <Link href="/services" className="flex items-center justify-between p-3 rounded-lg text-slate-700 font-semibold hover:bg-red-50">
                          All Repair Services
                          <ArrowRight className="w-4 h-4 text-red-500" />
                        </Link>
                        <div className="my-1 border-t border-slate-100"></div>
                        {link.submenu.map((sublink: any) => (
                          <Link key={sublink.label} href={sublink.href} className="flex items-center gap-3 p-3 rounded-lg text-slate-700 hover:bg-red-50">
                            <sublink.icon className="w-5 h-5 text-red-500" />
                            <span>{sublink.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
                  )
                )}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <LocationChanger />
              <div className="flex items-center gap-2">
                {isAuthenticated ? (
                  <>
                    <Button asChild variant="ghost" className="font-semibold rounded-full px-5 text-red-600 hover:bg-red-50 hover:text-red-700">
                      <Link href={getDashboardLink()}>Dashboard</Link>
                    </Button>
                    <Button onClick={handleLogout} className="font-semibold rounded-full px-5 bg-slate-800 hover:bg-slate-900">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="font-semibold rounded-full px-5">
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="font-semibold rounded-full px-5 bg-red-600 hover:bg-red-700">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button className="p-2" onClick={() => setIsMenuOpen(true)}>
                <Menu className="w-6 h-6 text-slate-800" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Transition show={isMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setIsMenuOpen}>
          <Transition.Child as={Fragment} enter="ease-in-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-300" enterFrom="-translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-300" leaveFrom="translate-x-0" leaveTo="-translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="px-4 sm:px-6 py-4 flex items-center justify-between border-b">
                        <Logo />
                        <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-100"><X className="w-6 h-6" /></button>
                      </div>
                      <nav className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
                        <div className="flex-grow">
                          {navLinks.map((link) =>
                            link.submenu ? (
                              <div key={link.label}>
                                <button onClick={() => setOpenSubMenu(openSubMenu === link.label ? null : link.label)} className="w-full flex items-center justify-between py-3 text-lg font-semibold text-slate-800">
                                  <span>{link.label}</span>
                                  <ChevronDown className={`w-5 h-5 transition-transform ${openSubMenu === link.label ? "rotate-180" : ""}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openSubMenu === link.label ? 'max-h-96' : 'max-h-0'}`}>
                                  <div className="pl-4 border-l-2 border-red-200 ml-2 space-y-1 py-2">
                                    {link.submenu.map((sublink: any) => (
                                      <Link key={sublink.label} href={sublink.href} className="flex items-center gap-3 py-2.5 rounded-md px-2 text-slate-700 hover:bg-red-50">
                                        <sublink.icon className="w-5 h-5 text-red-500" />
                                        <span>{sublink.label}</span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <Link key={link.label} href={link.href} className={`block py-3 text-lg font-semibold rounded-md ${pathname === link.href ? "text-red-600" : "text-slate-800"}`}>{link.label}</Link>
                            )
                          )}
                        </div>
                        <div className="mt-auto py-6 border-t space-y-4">
                           <LocationChanger inMobileMenu={true} />
                           {isAuthenticated ? (
                            <>
                              <Button size="lg" asChild className="w-full bg-red-600 text-white rounded-full py-3"><Link href={getDashboardLink()}>Go to Dashboard</Link></Button>
                              <Button size="lg" variant="outline" onClick={handleLogout} className="w-full rounded-full py-3">Logout</Button>
                            </>
                          ) : (
                            <div className="grid grid-cols-2 gap-3">
                               <Button size="lg" variant="outline" asChild className="w-full rounded-full py-3"><Link href="/login">Log In</Link></Button>
                               <Button size="lg" asChild className="w-full bg-red-600 text-white rounded-full py-3"><Link href="/register">Sign Up</Link></Button>
                            </div>
                          )}
                        </div>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}