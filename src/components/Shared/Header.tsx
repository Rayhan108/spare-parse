"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { ConfigProvider, Input, } from "antd";
import { FiSearch } from "react-icons/fi";
import { IoIosHeartEmpty } from "react-icons/io";
import { PiShoppingCartLight } from "react-icons/pi";
import { GoPerson, GoVersions } from "react-icons/go";
import { LuShoppingBag } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";

import logo from "../../../public/logo.svg";
import darkLogo from "../../../public/dark-logo.svg";
import MobileMenu from "./MobileMenu";
import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useSwitchUserRoleMutation } from "@/redux/features/auth/switchRoleApi";
import { RootState } from "@/redux/store";
import { App } from "antd";
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = App.useApp();

  const user = useSelector((state: RootState) => state.logInUser?.user);

  // Use correct token based on current role
  const token = user?.role === "BUYER"
    ? Cookies.get("hatem-ecommerce-token")
    : Cookies.get("hatem-seller-token");

  // ---------------- Dark Mode ----------------
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode");
    if (storedMode === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.documentElement.classList.toggle("dark", newMode);
      localStorage.setItem("darkMode", String(newMode));
      return newMode;
    });
  };

  // ---------------- Mobile Menu ----------------
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  // ---------------- Submenu ----------------
  const [subMenu, setSubMenu] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  // Close submenu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
        setSubMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ---------------- Cart ----------------
  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const cartCount = cartData?.data?.length || 0;

  // ---------------- Wishlist ----------------
  const { data: wishlistData, isLoading: isWishlistLoading } = useGetWishlistQuery();
  const wishlistCount = wishlistData?.length || 0;

  // ---------------- Logout ----------------
  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("hatem-ecommerce-token");
    Cookies.remove("hatem-seller-token");
    localStorage.removeItem("hatem-ecommerce-token");
    localStorage.removeItem("hatem-seller-token");
    localStorage.removeItem("hatem-ecommerce-refreshToken");
    router.replace("/auth/login");
  };

  // ---------------- Switch Role ----------------
  const [switchUserRole, { isLoading }] = useSwitchUserRoleMutation();

  const handleRoleSwitch = async () => {
    if (!user) return;

    try {
      const newRole = user.role === "BUYER" ? "SELLER" : "BUYER";
      const res = await switchUserRole({ role: newRole }).unwrap();

      if (!res?.data?.accessToken) {
        return message.error("No access token received from server!");
      }

      const accessToken = res.data.accessToken;

      // Remove old tokens
      if (newRole === "SELLER") {
        Cookies.remove("hatem-ecommerce-token");
        localStorage.removeItem("hatem-ecommerce-token");
      } else {
        Cookies.remove("hatem-seller-token");
        localStorage.removeItem("hatem-seller-token");
      }

      // Save new token
      if (newRole === "SELLER") {
        Cookies.set("hatem-seller-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-seller-token", accessToken);
      } else {
        Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-ecommerce-token", accessToken);
      }

      // Update Redux properly
      dispatch(setUser({
        user: { ...user, role: newRole },
        accessToken: accessToken,
        refreshToken: "",
      }));

      message.success(res.message || "Role switched successfully!");
      router.replace(newRole === "SELLER" ? "/seller/overview" : "/myorder");

    } catch (err: unknown) {
      console.error("Switch Role Error:", err);
      message.error((err as { data?: { message?: string } })?.data?.message ?? "Failed to switch role");
    }
  };

  return (
    <header>
      {/* Top Banner */}
      <div className="bg-[#df5800] h-12 text-sm md:text-md text-center text-white flex items-center justify-center px-3 md:px-0">
        Summer Sale For All Parking Light And Free Express Delivery {" "}
        <Link href={`/product`}>
          <span className="ml-2 font-semibold underline cursor-pointer">ShopNow</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-600 dark:bg-black px-3 lg:px-0">
        <div className="container mx-auto py-4 flex items-center justify-between relative">
          {/* Logo */}
          <Link href="/">
            <Image
              className="w-42"
              src={isDarkMode ? darkLogo : logo}
              width={150}
              height={50}
              alt="logo"
            />
          </Link>

          {/* Desktop Links */}
          {/* Desktop Links */}
          <div className="hidden lg:flex items-center justify-between gap-12 text-black dark:text-white">
            <Link href="/" className="text-lg hover:text-primary no-underline">
              Home
            </Link>
            <Link href="/contact" className="text-lg hover:text-primary no-underline">
              Contact
            </Link>
            <Link href="/about" className="text-lg hover:text-primary no-underline">
              About
            </Link>
            {!token && (
              <Link href="/auth/login" className="text-lg hover:text-primary no-underline">
                Log In
              </Link>
            )}
            {user?.role === "SELLER" && (
              <Link href="/seller/overview" className="text-lg hover:text-primary no-underline">
                Dashboard
              </Link>
            )}
          </div>



          {/* Search, Wishlist, Cart, User */}
          <div className="hidden w-[380px] lg:flex items-center justify-between gap-4">
            <ConfigProvider
              theme={{
                components: {
                  Input: {
                    activeBorderColor: "transparent",
                    hoverBorderColor: "transparent",
                    colorBorder: "transparent",
                    controlHeight: 36,
                  },
                },
              }}
            >
              <Input
                style={{ backgroundColor: "#f0f0f0" }}
                suffix={<FiSearch className="text-black w-6 h-6" />}
                className="w-[280px]"
                placeholder="What are you looking for?"
              />
            </ConfigProvider>

            {/* Wishlist & Cart only for Buyer */}
            {user?.role !== "SELLER" && (
              <>
                {/* Wishlist */}
                <div className="relative">
                  <Link href={`/wishlist`}>
                    <IoIosHeartEmpty className="w-8 h-8 cursor-pointer dark:text-white" />
                  </Link>
                  {!isWishlistLoading && wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                      {wishlistCount}
                    </span>
                  )}
                </div>

                {/* Cart */}
                <div className="relative">
                  <Link href={`/cart`}>
                    <PiShoppingCartLight className="w-8 h-8 cursor-pointer dark:text-white" />
                  </Link>
                  {!isCartLoading && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                      {cartCount}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* User Submenu */}
            {token && (
              <div
                onClick={() => setSubMenu(!subMenu)}
                className="bg-[#df5800] flex items-center justify-center rounded-full p-2 mb-0.5 cursor-pointer"
              >
                <GoPerson className="w-6 h-6 text-white" />
              </div>
            )}
          </div>


          {/* Mobile Menu Icon */}
          <div className="block lg:hidden">
            <RxHamburgerMenu onClick={showDrawer} size={25} className="text-black dark:text-white" />
          </div>

          {/* Submenu */}
          {token && subMenu && (
            <div
              ref={subMenuRef}
              className="absolute w-[250px] bg-[#444444] dark:bg-[#c5c5c5] right-0 top-[80px] px-8 py-5 rounded-lg shadow-2xl z-50"
            >
              {/* Dark Mode */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-gray-200 dark:text-black">Dark Mode:</p>
                <button
                  onClick={handleToggle}
                  className={`w-14 h-6 flex items-center rounded-full p-1 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-all ${isDarkMode ? "translate-x-8" : ""}`}></div>
                </button>
              </div>

              {/* Account Links */}
              <Link href={`/myprofile`} className="flex items-center gap-3 mb-4">
                <GoPerson className="w-6 h-6 text-white dark:text-black" />
                <p className="text-md text-white dark:text-black">Manage My Account</p>
              </Link>

              {/* Switch Role */}
              <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={handleRoleSwitch}>
                {user?.role === "BUYER" ? (
                  <>
                    <GoVersions className="w-6 h-6 text-white dark:text-black" />
                    <p className="text-md text-white dark:text-black">{isLoading ? "Switching..." : "Switch to Seller"}</p>
                  </>
                ) : (
                  <>
                    <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
                    <p className="text-md text-white dark:text-black">{isLoading ? "Switching..." : "Switch to Buyer"}</p>
                  </>
                )}
              </div>

              {/* Role-specific Links */}
              {user?.role === "SELLER" ? (
                <div className="flex flex-col gap-2 mb-4">
                  <Link href={`/seller/myproduct`} className="flex items-center gap-3">
                    <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
                    <p className="text-md text-white dark:text-black">My Products</p>
                  </Link>

                  <Link href={`/seller/overview`} className="flex items-center gap-3 mt-1">
                    <GoVersions className="w-6 h-6 text-white dark:text-black" />
                    <p className="text-md text-white dark:text-black">Seller Overview</p>
                  </Link>
                </div>
              ) : (
                <Link href={`/myorder`} className="flex items-center gap-3 mb-4">
                  <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
                  <p className="text-md text-white dark:text-black">My Order</p>
                </Link>
              )}


              {/* Logout */}
              <div onClick={handleLogOut} className="flex items-center gap-3 mb-2 cursor-pointer">
                <GoPerson className="w-6 h-6 text-white dark:text-black" />
                <p className="text-md text-white dark:text-black">Logout</p>
              </div>
            </div>
          )}

          {/* Mobile Drawer */}
          <MobileMenu open={open} onClose={onClose} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
