"use client";

import { Drawer, Modal, App } from "antd";
import { Link, useRouter} from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

// Icons
import { IoIosHeartEmpty, IoMdClose } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { GoPerson, GoVersions } from "react-icons/go";
import { LuShoppingBag, LuLogOut } from "react-icons/lu";
import { FiMoon, FiSun, FiHome, FiPhone, FiInfo } from "react-icons/fi";
import { MdLogin } from "react-icons/md";
import { ExclamationCircleOutlined } from "@ant-design/icons";

// Assets
import logo from "../../../public/logo.svg";
import darkLogo from "../../../public/dark-logo.svg";
import avatar from "../../../public/avatar.png";

// Redux
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useSwitchUserRoleMutation } from "@/redux/features/auth/switchRoleApi";

// Components
import SellerRegistrationForm from "../Seller/SellerRegistrationForm/SellerRegistrationForm";

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
  const dispatch = useDispatch();
  const { message } = App.useApp();

  // States
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Switch Role States
  const [isSellerFormOpen, setIsSellerFormOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Redux & API
  const user = useSelector((state: RootState) => state.logInUser?.user);
  
  const { data: myProfile, refetch } = useGetUserProfileQuery(undefined);
  const userImg = myProfile?.data?.image;
  const isSeller = myProfile?.data?.isSeller;

  const [switchUserRole, { isLoading: isSwitchLoading }] = useSwitchUserRoleMutation();

  const { data: cartData } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const cartCount = cartData?.data?.length || 0;

  const { data: wishlistData } = useGetWishlistQuery();
  const wishlistCount = wishlistData?.length || 0;

  const token =
    user?.role === "BUYER"
      ? Cookies.get("hatem-ecommerce-token")
      : Cookies.get("hatem-seller-token");

  const currentLang = languages.find((l) => l.code === locale) || languages[0];
  const targetRole = user?.role === "BUYER" ? "Seller" : "Buyer";

  // Dark mode effect
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    setIsDarkMode(storedMode === "true");
  }, []);

  // Styles
  const styles = {
    bg: isDarkMode ? "bg-gray-900" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    textMuted: isDarkMode ? "text-gray-400" : "text-gray-500",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    hoverBg: isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100",
    profileBg: isDarkMode ? "bg-gray-800" : "bg-gray-50",
    iconColor: isDarkMode ? "text-white" : "text-black",
  };

  const linkClass = `flex items-center gap-3 p-3 rounded-lg ${styles.hoverBg} ${styles.text} no-underline w-full text-left`;

  // --- Handlers ---

  const handleLanguageSelect = (langCode: LanguageCode) => {
    setIsLangOpen(false);
    if (langCode === locale) return;
    router.replace("/", { locale: langCode });
    onClose();
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("hatem-ecommerce-token");
    Cookies.remove("hatem-seller-token");
    localStorage.removeItem("hatem-ecommerce-token");
    localStorage.removeItem("hatem-seller-token");
    localStorage.removeItem("hatem-ecommerce-refreshToken");
    router.replace("/auth/login");
    onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  // --- Switch Role Logic (Identical to Header) ---

  const handleSwitchRoleClick = async () => {
    // Close the drawer first to show modal clearly
    onClose();

    try {
      const result = await refetch();
      const currentIsSeller = result.data?.data?.isSeller;

      if (user?.role === "BUYER" && !currentIsSeller) {
        setIsSellerFormOpen(true);
        return;
      }

      setIsModalVisible(true);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      message.error("Failed to verify seller status");
    }
  };

  const handleConfirmSwitch = async () => {
    refetch();
    if (isSwitchLoading) return;
    if (!user) return;

    try {
      const newRole = user.role === "BUYER" ? "SELLER" : "BUYER";
      const res = await switchUserRole({ role: newRole }).unwrap();

      if (!res?.data?.accessToken) {
        setIsModalVisible(false);
        return message.error("No access token received from server!");
      }

      const accessToken = res.data.accessToken;

      // Update cookies and localStorage
      if (newRole === "SELLER") {
        Cookies.remove("hatem-ecommerce-token");
        localStorage.removeItem("hatem-ecommerce-token");
        Cookies.set("hatem-seller-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-seller-token", accessToken);
      } else {
        Cookies.remove("hatem-seller-token");
        localStorage.removeItem("hatem-seller-token");
        Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-ecommerce-token", accessToken);
      }

      // Update Redux state
      dispatch(
        setUser({
          user: { ...user, role: newRole },
          accessToken: accessToken,
          refreshToken: "",
        })
      );

      setIsModalVisible(false);
      message.success(res.message || "Role switched successfully!");

      // Redirect
      router.replace(
        newRole === "SELLER" ? "/seller/overview" : "/myorder"
      );
    } catch (err: unknown) {
      console.error("Switch Role Error:", err);
      setIsModalVisible(false);
      message.error(
        (err as { data?: { message?: string } })?.data?.message ??
          "Failed to switch role"
      );
    }
  };

  const handleSellerRegistrationSuccess = () => {
    setIsSellerFormOpen(false);
    refetch();
    // Optionally open confirmation modal immediately after
    // setIsModalVisible(true); 
  };

  return (
    <>
      <Drawer
        placement={locale === "ar" ? "left" : "right"}
        onClose={onClose}
        open={open}
        width={300}
        closable={false}
        styles={{
          body: {
            padding: 0,
            backgroundColor: isDarkMode ? "#111827" : "#ffffff",
          },
          header: { display: "none" },
        }}
      >
        <div className={`flex flex-col h-full ${styles.bg}`}>
          {/* Header */}
          <div className={`flex items-center justify-between p-4 border-b ${styles.border}`}>
            <Link href="/" onClick={handleNavClick}>
              <Image
                src={isDarkMode ? darkLogo : logo}
                width={120}
                height={40}
                alt="logo"
              />
            </Link>
            <button
              onClick={onClose}
              className={`p-2 rounded-full ${styles.hoverBg}`}
            >
              <IoMdClose className={`w-6 h-6 ${styles.iconColor}`} />
            </button>
          </div>

          {/* User Profile Section - Only if logged in */}
          {token && (
            <div className={`flex items-center gap-3 p-4 border-b ${styles.border} ${styles.profileBg}`}>
              <Image
                alt="user"
                src={userImg || avatar}
                width={50}
                height={50}
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <p className={`font-medium ${styles.text}`}>
                  {myProfile?.data?.name || "User"}
                </p>
                <p className={`text-sm ${styles.textMuted}`}>
                  {user?.role === "SELLER" ? t("seller") : t("buyer")}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {/* Home */}
              <Link href="/" onClick={handleNavClick} className={linkClass}>
                <FiHome className={`w-5 h-5 ${styles.iconColor}`} />
                <span className={`text-base font-medium ${styles.text}`}>
                  {t("home")}
                </span>
              </Link>

              {/* Contact */}
              <Link href="/contact" onClick={handleNavClick} className={linkClass}>
                <FiPhone className={`w-5 h-5 ${styles.iconColor}`} />
                <span className={`text-base font-medium ${styles.text}`}>
                  {t("contact")}
                </span>
              </Link>

              {/* About */}
              <Link href="/about" onClick={handleNavClick} className={linkClass}>
                <FiInfo className={`w-5 h-5 ${styles.iconColor}`} />
                <span className={`text-base font-medium ${styles.text}`}>
                  {t("about")}
                </span>
              </Link>

              {/* Login - Only if not logged in */}
              {!token && (
                <Link href="/auth/login" onClick={handleNavClick} className={linkClass}>
                  <MdLogin className={`w-5 h-5 ${styles.iconColor}`} />
                  <span className={`text-base font-medium ${styles.text}`}>
                    {t("login")}
                  </span>
                </Link>
              )}

              {/* Divider */}
              {token && <div className={`border-t ${styles.border} my-3`} />}

              {/* Wishlist & Cart - Only for Buyer */}
              {token && user?.role !== "SELLER" && (
                <>
                  <Link
                    href="/wishlist"
                    onClick={handleNavClick}
                    className={`flex items-center  p-3 rounded-lg ${styles.hoverBg} no-underline`}
                  >
                    <div className="flex items-center gap-3 ">
                      <IoIosHeartEmpty className={`w-5 h-5 ${styles.iconColor}`} />
                    </div>
                    {wishlistCount > 0 && (
                      <span className="bg-yellow-600 text-white text-xs px-2 py-1 ml-1 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    href="/cart"
                    onClick={handleNavClick}
                    className={`flex items-center  p-3 rounded-lg ${styles.hoverBg} no-underline`}
                  >
                    <div className="flex items-center gap-3">
                      <PiShoppingCartLight className={`w-5 h-5 ${styles.iconColor}`} />
                    </div>
                    {cartCount > 0 && (
                      <span className="bg-red-600 text-white text-xs px-2 py-1 ml-1 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}

              {/* Logged in user options */}
              {token && (
                <>
                  {/* My Profile */}
                  <Link href="/myprofile" onClick={handleNavClick} className={linkClass}>
                    <GoPerson className={`w-5 h-5 ${styles.iconColor}`} />
                    <span className={`text-base font-medium ${styles.text}`}>
                      {t("manageAcount")}
                    </span>
                  </Link>

                  {/* Switch Role Button */}
                  <button
                    onClick={handleSwitchRoleClick}
                    className={linkClass}
                  >
                    {user?.role === "BUYER" ? (
                       <GoVersions className={`w-5 h-5 ${styles.iconColor}`} />
                    ) : (
                       <LuShoppingBag className={`w-5 h-5 ${styles.iconColor}`} />
                    )}
                    <span className={`text-base font-medium ${styles.text}`}>
                      {user?.role === "BUYER" 
                        ? (isSeller ? t("swithToSeller") : t("becomeASeller"))
                        : t("swithToBuyer")
                      }
                    </span>
                  </button>

                  {/* My Order - For Buyer */}
                  {user?.role !== "SELLER" && (
                    <Link href="/myorder" onClick={handleNavClick} className={linkClass}>
                      <LuShoppingBag className={`w-5 h-5 ${styles.iconColor}`}/>
                      <span className={`text-base font-medium ${styles.text}`}>
                        {t("myOrder")}
                      </span>
                    </Link>
                  )}

                  {/* Seller Dashboard & Products */}
                  {user?.role === "SELLER" && (
                    <>
                      <Link
                        href="/seller/overview"
                        onClick={handleNavClick}
                        className={linkClass}
                      >
                        <GoVersions className={`w-5 h-5 ${styles.iconColor}`}/>
                        <span className={`text-base font-medium ${styles.text}`}>
                          {t("dashboard")}
                        </span>
                      </Link>

                      <Link
                        href="/seller/myproduct"
                        onClick={handleNavClick}
                        className={linkClass}
                      >
                        <LuShoppingBag className={`w-5 h-5 ${styles.iconColor}`} />
                        <span className={`text-base font-medium ${styles.text}`}>
                          {t("myProduct")}
                        </span>
                      </Link>
                    </>
                  )}
                </>
              )}

              {/* Divider */}
              <div className={`border-t ${styles.border} my-3`} />

              {/* Language Selector */}
              <div className="p-3">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className={`flex items-center justify-between w-full ${styles.text}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{currentLang.flag}</span>
                    <span className={`text-base font-medium ${styles.text}`}>
                      {currentLang.name}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 ${styles.iconColor} transition-transform ${
                      isLangOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isLangOpen && (
                  <div className="mt-2 ml-8 space-y-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        className={`flex items-center gap-2 w-full p-2 rounded-lg text-left ${
                          locale === lang.code
                            ? isDarkMode
                              ? "bg-orange-900/30 text-orange-400"
                              : "bg-orange-100 text-orange-600"
                            : `${styles.hoverBg} ${styles.text}`
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                        {locale === lang.code && <span className="ml-auto">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between p-3">
                <div className={`flex items-center gap-3 ${styles.text}`}>
                  {isDarkMode ? (
                    <FiMoon className={`w-5 h-5 ${styles.iconColor}`} />
                  ) : (
                    <FiSun className={`w-5 h-5 ${styles.iconColor}`} />
                  )}
                  <span className={`text-base font-medium ${styles.text}`}>
                    {t("darkmode")}
                  </span>
                </div>
                <button
                  onClick={handleToggleDarkMode}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                    isDarkMode ? "bg-orange-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      isDarkMode ? "translate-x-6" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </nav>
          </div>

          {/* Logout Button - Only if logged in */}
          {token && (
            <div className={`p-4 border-t ${styles.border}`}>
              <button
                onClick={handleLogOut}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-red-900/20 text-red-400 hover:bg-red-900/40"
                    : "bg-red-50 text-red-600 hover:bg-red-100"
                }`}
              >
                <LuLogOut className="w-5 h-5" />
                <span className="text-base font-medium">{t("logout")}</span>
              </button>
            </div>
          )}
        </div>
      </Drawer>

      {/* Role Switch Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined className="text-orange-500 text-xl" />
            <span>Confirm Role Switch</span>
          </div>
        }
        open={isModalVisible}
        onOk={handleConfirmSwitch}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={isSwitchLoading}
        okText={isSwitchLoading ? "Switching..." : `Yes, Switch to ${targetRole}`}
        cancelText={t("cancel")}
        okButtonProps={{
          className: "bg-[#df5800] hover:bg-[#c54d00]",
          disabled: isSwitchLoading,
        }}
        cancelButtonProps={{ disabled: isSwitchLoading }}
        maskClosable={!isSwitchLoading}
        closable={!isSwitchLoading}
        centered
      >
        <div className="py-4">
          <p className="text-gray-600 dark:text-white text-base">
            Are you sure you want to switch your role from{" "}
            <strong>{user?.role === "BUYER" ? t("buyer") : t("seller")}</strong>{" "}
            to <strong>{targetRole}</strong>?
          </p>
        </div>
      </Modal>

      {/* Seller Registration Form Modal */}
      <SellerRegistrationForm
        isOpen={isSellerFormOpen}
        onClose={() => setIsSellerFormOpen(false)}
        onSuccess={handleSellerRegistrationSuccess}
      />
    </>
  );
};

export default MobileMenu;