"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAddressesQuery } from "@/redux/features/address/addressApi";
import { Spin } from "antd";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";

interface User {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  role?: string;
}

const AccountDetails = () => {

  const user = useSelector<RootState, User | null>(
    (state) => state.logInUser.user
  );
  const {data:myProfile}=useGetUserProfileQuery(undefined)
  // console.log("my profile -->",myProfile);
  const { data: addressData, isLoading: loadingAddresses } = useGetAddressesQuery();
  const shippingAddress = addressData?.data.find((addr) => addr.type === "SHIPPING");

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-600">No user logged in.</p>
      </div>
    );
  }

  if (loadingAddresses) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-medium">Account Details</h2>

      {/* Login Details */}
      <div className="grid gap-8 sm:gap-0 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Login Details:</h2>
        </div>
        <div>
          <div className="mb-5">
            <p>Full Name</p>
            <p>{myProfile?.data?.fullName || "N/A"}</p>
          </div>
          <div className="mb-5">
            <p>Email</p>
            <p>{myProfile?.data?.email || "N/A"}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>{myProfile?.data?.phoneNumber || "N/A"}</p>
          </div>
        </div>
        <div>
          {/* <Link href={`/myprofile/editaccount`}>
            <button className="w-[200px] py-3 rounded border border-primary cursor-pointer">
              Edit Account
            </button>
          </Link> */}
          <Link
            href={
              user?.role === "SELLER"
                ? "/myprofile/seller-editaccount"
                : "/myprofile/editaccount"
            }
          >
            <button className="w-[200px] py-3 rounded border border-primary cursor-pointer">
              Edit Account
            </button>
          </Link>

        </div>
      </div>

      {/* Password */}
      <div className="grid gap-8 sm:gap-0 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Password:</h2>
        </div>
        <div>
          <div className="mb-5">
            <p>Current Password</p>
            <p>*********</p>
          </div>
        </div>
        <div>
          <Link href={`/myprofile/changepassword`}>
            <button className="w-[200px] py-3 rounded border border-primary cursor-pointer">
              Change Password
            </button>
          </Link>
        </div>
      </div>

      {/* Address Book */}
      <div className="grid gap-8 sm:gap-0 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Address Book:</h2>
        </div>
        <div>
          <div className="mb-5">
            <p className="mb-2">Shipping Address</p>
            <p>{shippingAddress?.addressLine || "N/A"}</p>
            <p>
              {shippingAddress?.city || "N/A"}, {shippingAddress?.state || ""}
            </p>
            <p>{shippingAddress?.postalCode || ""}</p>
          </div>
        </div>
        <div>
          <Link href={`/myprofile/changeaddress`}>
            <button className="w-[200px] py-3 rounded border border-primary cursor-pointer">
              Change Address
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
