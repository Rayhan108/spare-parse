"use client";

import { Drawer } from "antd";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "@/utils/navigation";

const languages = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

const MobileMenu = ({ open, onClose, locale }: MobileMenuProps) => {
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageSelect = (langCode: LanguageCode) => {
    setIsLangOpen(false);
    
    if (langCode === locale) return;

    const localePattern = new RegExp(`^/(${languages.map((l) => l.code).join("|")})`);
    const pathWithoutLocale = pathname.replace(localePattern, "") || "/";
    const newPath = `/${langCode}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;

    router.push(newPath);
    onClose();
  };

  return (
    <Drawer
      title="Menu"
      placement={locale === "ar" ? "right" : "left"}
      onClose={onClose}
      open={open}
    >
      <div className="flex flex-col gap-4">
        <Link href={`/${locale}`} onClick={onClose} className="text-lg">
          {t("home")}
        </Link>
        <Link href={`/${locale}/contact`} onClick={onClose} className="text-lg">
          {t("contact")}
        </Link>
        <Link href={`/${locale}/about`} onClick={onClose} className="text-lg">
          {t("about")}
        </Link>

        {/* Language Selector */}
        <div className="mt-4 border-t pt-4">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 text-orange-500"
          >
            <span>{currentLang.flag}</span>
            <span>{currentLang.name}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isLangOpen && (
            <div className="mt-2 bg-gray-100 rounded-lg overflow-hidden">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang.code)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-2 ${
                    locale === lang.code
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default MobileMenu;