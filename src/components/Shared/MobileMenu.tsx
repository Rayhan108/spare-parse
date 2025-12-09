"use client";
import { ConfigProvider, Drawer, Input, Modal } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { FiSearch } from "react-icons/fi";
import { GoPerson, GoVersions } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { PiShoppingCartLight } from "react-icons/pi";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { logout, setUser } from "@/redux/features/auth/authSlice";
import { useGetCartQuery } from "@/redux/features/cart/cartApi";
import { useGetWishlistQuery } from "@/redux/features/wishlist/wishlistApi";
import { useSwitchUserRoleMutation } from "@/redux/features/auth/switchRoleApi";
import { App } from "antd";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { message } = App.useApp();
  const user = useSelector((state: RootState) => state.logInUser?.user);
  const token =
    user?.role === "BUYER"
      ? Cookies.get("hatem-ecommerce-token")
      : Cookies.get("hatem-seller-token");

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

  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const cartCount = cartData?.data?.length || 0;

  const { data: wishlistData, isLoading: isWishlistLoading } =
    useGetWishlistQuery();
  const wishlistCount = wishlistData?.length || 0;

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

  // Modal state for role switch confirmation
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Show the confirmation modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Handle the modal confirm action (switch role)
  const handleOk = async () => {
    await handleRoleSwitch();
  };

  // Handle modal cancel action (close modal)
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [switchUserRole, { isLoading }] = useSwitchUserRoleMutation();

  const handleRoleSwitch = async () => {
    if (!user) return;

    try {
      const newRole = user.role === "BUYER" ? "SELLER" : "BUYER";
      const res = await switchUserRole({ role: newRole }).unwrap();

      if (!res?.data?.accessToken) {
        setIsModalVisible(false);
        return message.error("No access token received from server!");
      }

      const accessToken = res.data.accessToken;

      if (newRole === "SELLER") {
        Cookies.remove("hatem-ecommerce-token");
        localStorage.removeItem("hatem-ecommerce-token");
      } else {
        Cookies.remove("hatem-seller-token");
        localStorage.removeItem("hatem-seller-token");
      }

      if (newRole === "SELLER") {
        Cookies.set("hatem-seller-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-seller-token", accessToken);
      } else {
        Cookies.set("hatem-ecommerce-token", accessToken, { expires: 7 });
        localStorage.setItem("hatem-ecommerce-token", accessToken);
      }

      dispatch(
        setUser({
          user: { ...user, role: newRole },
          accessToken,
          refreshToken: "",
        })
      );

      setIsModalVisible(false); // Close modal on success
      message.success(res.message || "Role switched successfully!");
      router.replace(newRole === "SELLER" ? "/seller/overview" : "/myorder");
      onClose(); // Close the drawer
    } catch (err: unknown) {
      console.error("Switch Role Error:", err);
      setIsModalVisible(false); // Close modal on error
      message.error(
        (err as { data?: { message?: string } })?.data?.message ??
          "Failed to switch role"
      );
    }
  };

  // Get the target role for display in modal
  const targetRole = user?.role === "BUYER" ? "Seller" : "Buyer";

  return (
    <>
      <Drawer closable onClose={onClose} open={open} width={280}>
        {/* Search */}
        <div className="mb-5">
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
              className="w-full"
              placeholder="What are you looking for?"
            />
          </ConfigProvider>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-3 mb-6">
          <Link onClick={onClose} href="/" className="text-lg !text-black">
            Home
          </Link>
          <Link
            onClick={onClose}
            href="/contact"
            className="text-lg !text-black"
          >
            Contact
          </Link>
          <Link onClick={onClose} href="/about" className="text-lg !text-black">
            About
          </Link>
          {!token && (
            <Link
              onClick={onClose}
              href="/auth/login"
              className="text-lg text-black"
            >
              Log In
            </Link>
          )}
          {user?.role === "SELLER" && (
            <Link
              href="/seller/overview"
              className="text-lg hover:text-primary no-underline"
            >
              Dashboard
            </Link>
          )}
        </div>

        {user?.role !== "SELLER" && (
          <div className="flex items-center gap-4 mb-6">
            {/* Wishlist */}
            <div className="relative">
              <Link href={`/wishlist`} onClick={onClose}>
                <IoIosHeartEmpty className="w-8 h-8 cursor-pointer" />
              </Link>
              {!isWishlistLoading && wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {wishlistCount}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <Link href={`/cart`} onClick={onClose}>
                <PiShoppingCartLight className="w-8 h-8 cursor-pointer" />
              </Link>
              {!isCartLoading && cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        )}

        {/* User Menu */}
        {token && (
          <div className="bg-[#636363] px-4 py-5 rounded-lg shadow-2xl flex flex-col gap-4">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <p className="text-white">Dark Mode:</p>
              <button
                onClick={handleToggle}
                className={`w-14 h-6 flex items-center rounded-full p-1 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-all ${
                    isDarkMode ? "translate-x-8" : ""
                  }`}
                />
              </button>
            </div>

            {/* Manage Account */}
            <Link
              onClick={onClose}
              href="/myprofile"
              className="flex items-center gap-3 !text-white"
            >
              <GoPerson className="w-6 h-6" /> Manage My Account
            </Link>

            {/* Role Switch - NOW TRIGGERS MODAL */}
            <div
              onClick={showModal}
              className="flex items-center gap-3 text-white cursor-pointer hover:opacity-80 transition-opacity"
            >
              {user?.role === "BUYER" ? (
                <>
                  <GoVersions className="w-6 h-6" />
                  <span>Switch to Seller</span>
                </>
              ) : (
                <>
                  <LuShoppingBag className="w-6 h-6" />
                  <span>Switch to Buyer</span>
                </>
              )}
            </div>

            {user?.role === "SELLER" ? (
              <div className="flex flex-col gap-2">
                <Link
                  href={`/seller/myproduct`}
                  onClick={onClose}
                  className="flex items-center gap-3"
                >
                  <LuShoppingBag className="w-6 h-6 text-white" />
                  <p className="text-md text-white">My Products</p>
                </Link>

                <Link
                  href={`/seller/overview`}
                  onClick={onClose}
                  className="flex items-center gap-3 mt-1"
                >
                  <GoVersions className="w-6 h-6 text-white" />
                  <p className="text-md text-white">Seller Overview</p>
                </Link>
              </div>
            ) : (
              <Link
                href={`/myorder`}
                onClick={onClose}
                className="flex items-center gap-3 mb-4"
              >
                <LuShoppingBag className="w-6 h-6 text-white" />
                <p className="text-md text-white">My Order</p>
              </Link>
            )}

            {/* Logout */}
            <div
              onClick={handleLogOut}
              className="flex items-center gap-3 text-white cursor-pointer hover:opacity-80 transition-opacity"
            >
              <GoPerson className="w-6 h-6" /> Logout
            </div>
          </div>
        )}
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
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={isLoading}
        okText={isLoading ? "Switching..." : `Yes, Switch to ${targetRole}`}
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-[#df5800] hover:bg-[#c54d00]",
          disabled: isLoading,
        }}
        cancelButtonProps={{
          disabled: isLoading,
        }}
        maskClosable={!isLoading}
        closable={!isLoading}
        centered
        zIndex={1100} // Higher than drawer's z-index
      >
        <div className="py-4">
          <p className="text-gray-600 text-base">
            Are you sure you want to switch your role from{" "}
            <span className="font-semibold text-gray-800">
              {user?.role === "BUYER" ? "Buyer" : "Seller"}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-gray-800">{targetRole}</span>?
          </p>
 
        </div>
      </Modal>
    </>
  );
};

export default MobileMenu;