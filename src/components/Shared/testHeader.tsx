// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import { Link, useRouter, usePathname } from "@/i18n/navigation";
// import { useState, useEffect, useRef } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import Cookies from "js-cookie";
// import { ConfigProvider, Input, Modal } from "antd";
// import { FiSearch } from "react-icons/fi";
// import { IoIosHeartEmpty } from "react-icons/io";
// import { PiShoppingCartLight } from "react-icons/pi";
// import { GoPerson, GoVersions } from "react-icons/go";
// import { LuShoppingBag } from "react-icons/lu";
// import { RxHamburgerMenu } from "react-icons/rx";
// import { ExclamationCircleOutlined } from "@ant-design/icons";

// import logo from "../../../public/logo.svg";
// import avatar from "../../../public/avatar.png";
// import darkLogo from "../../../public/dark-logo.svg";
// import MobileMenu from "./MobileMenu";
// import { logout, setUser } from "@/redux/features/auth/authSlice";
// import { useGetCartQuery } from "@/redux/features/cart/cartApi";
// import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
// import { useSwitchUserRoleMutation } from "@/redux/features/auth/switchRoleApi";
// import { RootState } from "@/redux/store";
// import { App } from "antd";
// import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
// import { ChevronDown } from "lucide-react";

// import { useTranslations } from "next-intl";
// import SellerRegistrationForm from "../Seller/SellerRegistrationForm/SellerRegistrationForm";

// // Language configuration
// const languages = [
//   { code: "fr", name: "Français", flag: "🇫🇷" },
//   { code: "en", name: "English", flag: "🇺🇸" },
//   { code: "ar", name: "العربية", flag: "🇸🇦" },
// ] as const;

// type LanguageCode = (typeof languages)[number]["code"];

// const getLanguageByCode = (code: string) => {
//   return languages.find((lang) => lang.code === code) || languages[0];
// };

// const Header = ({ locale }: { locale: string }) => {
//   const t = useTranslations("nav");

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const pathname = usePathname();
//   const { message } = App.useApp();

//   // States
//   const [isSellerFormOpen, setIsSellerFormOpen] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isLanguageOpen, setIsLanguageOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [subMenu, setSubMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Refs
//   const languageRef = useRef<HTMLDivElement>(null);
//   const subMenuRef = useRef<HTMLDivElement>(null);

//   // Redux & API
//   const user = useSelector((state: RootState) => state.logInUser?.user);
//   const { data: myProfile,refetch} = useGetUserProfileQuery(undefined);
//   const userImg = myProfile?.data?.image;
//   const isSeller = myProfile?.data?.isSeller;
// // console.log("is seller ----------->",isSeller);
//   const [switchUserRole, { isLoading }] = useSwitchUserRoleMutation();

//   const { data: cartData, isLoading: isCartLoading,refetch: refetchCart} = useGetCartQuery(
//     undefined,
//     { refetchOnMountOrArgChange: true }
//   );
//       // Refetch cart data when page loads
//       useEffect(() => {
//           refetchCart();
//       }, [refetchCart]);
//   const cartCount = cartData?.data?.length || 0;

//   const { data: wishlistData, isLoading: isWishlistLoading } =
//     useGetWishlistQuery();
//   const wishlistCount = wishlistData?.length || 0;

//   const currentLanguage = getLanguageByCode(locale);

//   const token =
//     user?.role === "BUYER"
//       ? Cookies.get("hatem-ecommerce-token")
//       : Cookies.get("hatem-seller-token");

//   // Effects
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         languageRef.current &&
//         !languageRef.current.contains(event.target as Node)
//       ) {
//         setIsLanguageOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         subMenuRef.current &&
//         !subMenuRef.current.contains(event.target as Node)
//       ) {
//         setSubMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const storedMode = localStorage.getItem("darkMode");
//     if (storedMode === "true") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   // Handlers
//   const toggleLanguageDropdown = () => {
//     setIsLanguageOpen((prev) => !prev);
//   };

//   // const handleLanguageSelect = (langCode: LanguageCode) => {
//   //   setIsLanguageOpen(false);
//   //   if (langCode === locale) return;

//   //   let pathWithoutLocale = pathname;
//   //   const localePattern = new RegExp(
//   //     `^/(${languages.map((l) => l.code).join("|")})`
//   //   );
//   //   pathWithoutLocale = pathname.replace(localePattern, "") || "/";
//   //   const newPath = `/${langCode}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
//   //   router.push(newPath);
//   // };
//   //  SIMPLIFIED: Language selection with next-intl router
//   const handleLanguageSelect = (langCode: LanguageCode) => {
//     setIsLanguageOpen(false);
//     if (langCode === locale) return;
    
//     //  Use next-intl router - it handles locale automatically
//     router.replace(pathname, { locale: langCode });
//   };

//   const handleToggle = () => {
//     setIsDarkMode((prev) => {
//       const newMode = !prev;
//       document.documentElement.classList.toggle("dark", newMode);
//       localStorage.setItem("darkMode", String(newMode));
//       return newMode;
//     });
//   };
// const isHomePage = pathname === "/";
// const isProductPage = pathname === "/product";
//   const showDrawer = () => setOpen(true);
//   const onClose = () => setOpen(false);

//   const handleLogOut = () => {
//     dispatch(logout());
//     Cookies.remove("hatem-ecommerce-token");
//     Cookies.remove("hatem-seller-token");
//     localStorage.removeItem("hatem-ecommerce-token");
//     localStorage.removeItem("hatem-seller-token");
//     localStorage.removeItem("hatem-ecommerce-refreshToken");
//     router.replace(`/auth/login`);
//   };

//   const handleInputChange = (e: any) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     router.push(`?query=${encodeURIComponent(value)}`);
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       router.push(`?query=${searchQuery}`);
//     }
//   };

//   //  Handle Switch Role Button Click
//   // const handleSwitchRoleClick1 = () => {
//   //   refetch()


//   //   setSubMenu(false); 

//   //   if (user?.role === "BUYER" && !isSeller) {
//   //     setIsSellerFormOpen(true);
//   //     return;
//   //   }

 
//   //   setIsModalVisible(true);
//   // };

// const handleSwitchRoleClick = async () => {
//   setSubMenu(false);
  
//   try {

//     const result = await refetch();
//     const currentIsSeller = result.data?.data?.isSeller;
    
//     // console.log("Fresh isSeller value:", currentIsSeller);

//     if (user?.role === "BUYER" && !currentIsSeller) {
//       setIsSellerFormOpen(true);
//       return;
//     }

//     setIsModalVisible(true);
//   } catch (error) {
//     console.error("Failed to fetch profile:", error);
//     message.error("Failed to verify seller status");
//   }
// };


//   //  Confirmation Modal Cancel
//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   //  Confirmation Modal OK - Execute Role Switch
//   const handleConfirmSwitch = async () => {
//        refetch()
//     if (isLoading) return;
//     if (!user) return;

//     try {
//       const newRole = user.role === "BUYER" ? "SELLER" : "BUYER";
//       const res = await switchUserRole({ role: newRole }).unwrap();

//       if (!res?.data?.accessToken) {
//         setIsModalVisible(false);
//         return message.error("No access token received from server!");
//       }

//       const accessToken = res.data.accessToken;

//       // Update cookies and localStorage
//       if (newRole === "SELLER") {
//         Cookies.remove("hatem-ecommerce-token");
//         localStorage.removeItem("hatem-ecommerce-token");
//         Cookies.set("hatem-seller-token", accessToken, { expires: 7 });
//         localStorage.setItem("hatem-seller-token", accessToken);
//       } else {
//         Cookies.remove("hatem-seller-token");
//         localStorage.removeItem("hatem-seller-token");
//         Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
//         localStorage.setItem("hatem-ecommerce-token", accessToken);
//       }

//       // Update Redux state
//       dispatch(
//         setUser({
//           user: { ...user, role: newRole },
//           accessToken: accessToken,
//           refreshToken: "",
//         })
//       );

//       setIsModalVisible(false);
//       message.success(res.message || "Role switched successfully!");

//       // Redirect to appropriate page
//       // router.replace(
//       //   newRole === "SELLER"
//       //     ? `/${locale}/seller/overview`
//       //     : `/${locale}/myorder`
//       // );
//             router.replace(
//         newRole === "SELLER" ? "/seller/overview/orders" : "/myorder"
//       );
//     } catch (err: unknown) {
//       console.error("Switch Role Error:", err);
//       setIsModalVisible(false);
//       message.error(
//         (err as { data?: { message?: string } })?.data?.message ??
//           "Failed to switch role"
//       );
//     }
//   };

//   //  After Seller Registration Success - Optionally auto-switch
//   const handleSellerRegistrationSuccess = () => {
//     setIsSellerFormOpen(false);

    
//     // setIsModalVisible(true);
//     refetch()
//   };

//   const targetRole = user?.role === "BUYER" ? "Seller" : "Buyer";

//   return (
//     <header>
//       {/* Top Banner */}
//       <div className="bg-[#df5800] h-12 text-sm md:text-md text-center text-white flex items-center justify-center px-3 md:px-0">
//         {t("summerSale")}{" "}
//         {/* <Link href={`/${locale}/product`}> */}
//         <Link href={`/product`}>
//           <span className="ml-2 font-semibold underline cursor-pointer">
//             {t("shopNow")}
//           </span>
//         </Link>
//       </div>

//       {/* Navigation */}
//       <nav className="border-b border-gray-200 dark:border-gray-600 dark:bg-black px-3 lg:px-0">
//         <div className="container mx-auto py-4 flex items-center justify-between relative">
//           {/* Logo */}
//           {/* <Link href={`/${locale}`}> */}
//           <Link href={`/`}>
//             <Image
//               className="w-42"
//               src={isDarkMode ? darkLogo : logo}
//               width={150}
//               height={50}
//               alt="logo"
//             />
//           </Link>

//           {/* Desktop Links */}
//           <div className="hidden lg:flex items-center justify-between gap-12 text-black dark:text-white">
//             <Link
//               href={`/`}
//               className="text-lg hover:text-primary no-underline"
//             >
//               {t("home")}
//             </Link>
//             <Link
//               href={`/contact`}
//               className="text-lg hover:text-primary no-underline"
//             >
//               {t("contact")}
//             </Link>
//             <Link
//               href={`/about`}
//               className="text-lg hover:text-primary no-underline"
//             >
//               {t("about")}
//             </Link>
//             {!token && (
//               <Link
//                 href={`/auth/login`}
//                 className="text-lg hover:text-primary no-underline"
//               >
//                 {t("login")}
//               </Link>
//             )}
//             {user?.role === "SELLER" && (
//               <Link
//                 href={`/seller/overview/orders`}
//                 className="text-lg hover:text-primary no-underline"
//               >
//                 {t("dashboard")}
//               </Link>
//             )}

//             {/* Language Dropdown */}
//             <div className="relative" ref={languageRef}>
//               <button
//                 className="flex items-center text-orange-500 hover:text-orange-600 font-medium gap-1"
//                 onClick={toggleLanguageDropdown}
//               >
//                 <span>{currentLanguage.flag}</span>
//                 <span>{currentLanguage.name}</span>
//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform duration-200 ${
//                     isLanguageOpen ? "rotate-180" : ""
//                   }`}
//                 />
//               </button>

//               {isLanguageOpen && (
//                 <div className="absolute top-full mt-2 bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-600 w-40 rounded-lg text-sm z-50 overflow-hidden">
//                   {languages.map((lang: any) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageSelect(lang.code)}
//                       className={`w-full text-left px-4 py-3 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                         locale === lang.code
//                           ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 font-medium"
//                           : "text-gray-700 dark:text-gray-200"
//                       }`}
//                     >
//                       <span>{lang.flag}</span>
//                       <span>{lang.name}</span>
//                       {locale === lang.code && (
//                         <span className="ml-auto text-orange-500">✓</span>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Search & Icons */}
//           <div className="hidden w-[380px] lg:flex items-center justify-between gap-4">
//           {(isHomePage || isProductPage) && (
//   <ConfigProvider
//     theme={{
//       components: {
//         Input: {
//           activeBorderColor: "transparent",
//           hoverBorderColor: "transparent",
//           colorBorder: "transparent",
//           controlHeight: 36,
//         },
//       },
//     }}
//   >
//     <Input
//       style={{ backgroundColor: "#f0f0f0" }}
//       suffix={<FiSearch className="text-black w-6 h-6" />}
//       className="w-[280px]"
//       placeholder={t("searchPlaceholder")}
//       value={searchQuery}
//       onChange={handleInputChange}
//       onPressEnter={handleSearch}
//     />
//   </ConfigProvider>
// )}

//             {/* Wishlist & Cart only for Buyer */}
//             {user?.role !== "SELLER" && (
//               <>
//                 <div className="relative">
//                   <Link href={`/wishlist`}>
//                     <IoIosHeartEmpty className="w-8 h-8 cursor-pointer dark:text-white" />
//                   </Link>
//                   {!isWishlistLoading && wishlistCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </div>

//                 <div className="relative">
//                   <Link href={`/cart`}>
//                     <PiShoppingCartLight className="w-8 h-8 cursor-pointer dark:text-white" />
//                   </Link>
//                   {!isCartLoading && cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
//                       {cartCount}
//                     </span>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* User Avatar */}
//             {token && (
//               <div
//                 onClick={() => setSubMenu(!subMenu)}
//                 className="cursor-pointer w-10 h-10 flex-shrink-0"
//               >
//                 <Image
//                   alt="user"
//                   src={userImg ? userImg : avatar}
//                   width={40}
//                   height={40}
//                   className="object-cover w-10 h-10 rounded-full"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Icon */}
//           <div className="block lg:hidden">
//             <RxHamburgerMenu
//               onClick={showDrawer}
//               size={25}
//               className="text-black dark:text-white"
//             />
//           </div>

//           {/* User Submenu */}
//           {token && subMenu && (
//             <div
//               ref={subMenuRef}
//               className="absolute w-[250px] bg-[#444444] dark:bg-[#c5c5c5] right-0 top-[80px] px-8 py-5 rounded-lg shadow-2xl z-50"
//             >
//               {/* Dark Mode */}
//               <div className="flex items-center justify-between mb-5">
//                 <p className="text-gray-200 dark:text-black">{t("darkmode")}:</p>
//                 <button
//                   onClick={handleToggle}
//                   className={`w-14 h-6 flex items-center rounded-full p-1 ${
//                     isDarkMode ? "bg-gray-700" : "bg-gray-300"
//                   }`}
//                 >
//                   <div
//                     className={`w-4 h-4 bg-white rounded-full transition-all ${
//                       isDarkMode ? "translate-x-8" : ""
//                     }`}
//                   ></div>
//                 </button>
//               </div>

//               {/* Manage Account */}
//               <Link
//                 href={`/myprofile`}
//                 className="flex items-center gap-3 mb-4"
//               >
//                 <GoPerson className="w-6 h-6 text-white dark:text-black" />
//                 <p className="text-md text-white dark:text-black">
//                   {t("manageAcount")}
//                 </p>
//               </Link>

//               {/*  Switch Role - Uses handleSwitchRoleClick */}
//               <div
//                 className="flex items-center gap-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
//                 onClick={handleSwitchRoleClick}
//               >
//                 {user?.role === "BUYER" ? (
//                   <>
//                     <GoVersions className="w-6 h-6 text-white dark:text-black" />
//                     <p className="text-md text-white dark:text-black">
//                       {/* Show different text based on isSeller */}
//                       {isSeller ? t("swithToSeller") :` ${t("becomeASeller")}`}
//                     </p>
//                   </>
//                 ) : (
//                   <>
//                     <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
//                     <p className="text-md text-white dark:text-black">
//                       {t("swithToBuyer")}
//                     </p>
//                   </>
//                 )}
//               </div>

//               {/* Role-specific Links */}
//               {user?.role === "SELLER" ? (
//                 <div className="flex flex-col gap-2 mb-4">
//                   <Link
//                     href={`/seller/myproduct`}
//                     className="flex items-center gap-3"
//                   >
//                     <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
//                     <p className="text-md text-white dark:text-black">
//                       {t("myProduct")}
//                     </p>
//                   </Link>
//                   <Link
//                     href={`/seller/overview/orders`}
//                     className="flex items-center gap-3 mt-1"
//                   >
//                     <GoVersions className="w-6 h-6 text-white dark:text-black" />
//                     <p className="text-md text-white dark:text-black">
//                       {t("sellerOverview")}
//                     </p>
//                   </Link>
//                 </div>
//               ) : (
//                 <Link
//                   href={`/myorder`}
//                   className="flex items-center gap-3 mb-4"
//                 >
//                   <LuShoppingBag className="w-6 h-6 text-white dark:text-black" />
//                   <p className="text-md text-white dark:text-black">
//                     {t("myOrder")}
//                   </p>
//                 </Link>
//               )}

//               {/* Logout */}
//               <div
//                 onClick={handleLogOut}
//                 className="flex items-center gap-3 mb-2 cursor-pointer"
//               >
//                 <GoPerson className="w-6 h-6 text-white dark:text-black" />
//                 <p className="text-md text-white dark:text-black">
//                   {t("logout")}
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Mobile Drawer */}
//           <MobileMenu open={open} onClose={onClose} locale={locale} />
//         </div>
//       </nav>

//       {/*  Role Switch Confirmation Modal - Only for registered sellers */}
//       <Modal
//         title={
//           <div className="flex items-center gap-2">
//             <ExclamationCircleOutlined className="text-orange-500 text-xl" />
//             <span>Confirm Role Switch</span>
//           </div>
//         }
//         open={isModalVisible}
//         onOk={handleConfirmSwitch}
//         onCancel={handleCancel}
//         confirmLoading={isLoading}
//         okText={isLoading ? "Switching..." : `Yes, Switch to ${targetRole}`}
//         cancelText={t("cancel")}
//         okButtonProps={{
//           className: "bg-[#df5800] hover:bg-[#c54d00]",
//           disabled: isLoading,
//         }}
//         cancelButtonProps={{ disabled: isLoading }}
//         maskClosable={!isLoading}
//         closable={!isLoading}
//         centered
//       >
//         <div className="py-4">
//           <p className="text-gray-600 text-base">
//             Are you sure you want to switch your role from{" "}
//             <strong>{user?.role === "BUYER" ? t("buyer") : t("seller")}</strong>{" "}
//             to <strong>{targetRole}</strong>?
//           </p>
//         </div>
//       </Modal>

//       {/*  Seller Registration Form Modal - Only for non-sellers */}
//       <SellerRegistrationForm
//         isOpen={isSellerFormOpen}
//         onClose={() => setIsSellerFormOpen(false)}
//         onSuccess={handleSellerRegistrationSuccess}
//       />
//     </header>
//   );
// };

// export default Header;