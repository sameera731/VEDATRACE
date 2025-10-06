"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Globe, Menu, X } from "lucide-react"


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const router = useRouter();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "hi" : "en")
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  const navigation = [
    {
      en: "About Project",
      hi: "परियोजना के बारे में",
      href: "/about",
    },
    {
      en: "Farmers",
      hi: "किसान",
      href: "/farmers",
    },
    {
      en: "Lab",
      hi: "परीक्षक",
      href: "/farmers",
    },
    {
      en: "Processing",
      hi: " प्रसंस्कर्ता",
      href: "/farmers",
    },
    {
      en: "Manufacturing",
      hi: "निर्माता",
      href: "/farmers",
    },
    {
      en: "Consumers",
      hi: "उपभोक्ता",
      href: "/consumers",
    },
    {
      en: "Contact Us",
      hi: "संपर्क करें",
      href: "/contact",
    },
  ]

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-lg">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight">{language === "en" ? "VEDATRACE" : "वेदाट्रेस"}</span>
              <span className="text-xs opacity-90">
                {language === "en" ? "Blockchain Herb Traceability" : "ब्लॉकचेन औषधि ट्रेसबिलिटी"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="hover:text-accent transition-colors duration-200 text-sm font-medium"
              >
                {language === "en" ? item.en : item.hi}
              </Link>
            ))}
          </nav>

          {/* Language Toggle, Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === "en" ? "हिंदी" : "English"}
            </Button>

            {/* Auth Buttons (Desktop) */}
            <Link href="/auth/login" className="hidden md:inline-block">
              <Button variant="default" size="sm" className="ml-2 font-semibold shadow hover:bg-green-800 transition-colors">{language === "en" ? "Sign In" : "साइन इन"}</Button>
            </Link>
            <Link href="/auth/signup" className="hidden md:inline-block">
              <Button variant="default" size="sm" className="ml-2 font-semibold shadow hover:bg-green-800 transition-colors">{language === "en" ? "Sign Up" : "साइन अप"}</Button>
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="hidden md:inline-block ml-2"
              onClick={handleLogout}
            >
              {language === "en" ? "Logout" : "लॉगआउट"}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 py-4">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-accent transition-colors duration-200 text-sm font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {language === "en" ? item.en : item.hi}
                </Link>
              ))}
              <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full mt-2">{language === "en" ? "Sign In" : "साइन इन"}</Button>
              </Link>
              <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full mt-2">{language === "en" ? "Sign Up" : "साइन अप"}</Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                className="w-full mt-2"
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
              >
                {language === "en" ? "Logout" : "लॉगआउट"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
