"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // make sure this path is correct

// Define the user type
interface Address {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface User {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  address?: Address;
}

const AccountDetails = () => {
  // Get the logged-in user from Redux and type it
  const user = useSelector<RootState, User | null>(
    (state) => state.logInUser.user
  );

  // If user is not logged in
  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-red-600">No user logged in.</p>
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
            <p>{user.fullName || "N/A"}</p>
          </div>
          <div className="mb-5">
            <p>Email</p>
            <p>{user.email || "N/A"}</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>{user.phoneNumber || "N/A"}</p>
          </div>
        </div>
        <div>
          <Link href={`/myprofile/editaccount`}>
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
            <p>{user.address?.street || "N/A"}</p>
            <p>
              {user.address?.city || "N/A"}, {user.address?.state || ""}
            </p>
            <p>{user.address?.zip || ""}</p>
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
