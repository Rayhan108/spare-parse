"use client";

import React, { useState } from "react";
import { Avatar, Breadcrumb, Upload, UploadFile, message, Spin } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import Link from "next/link";
import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
import {
  useGetUserProfileQuery,
  useUpdateProfileImageMutation,
} from "@/redux/features/auth/authApi";
import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";
import ProfileLayoutSkeleton from "@/utils/ProfileLayoutSkeleton";



interface CompanyInfo {
  phoneNumber: string;
  email: string;
  location: string;
}

interface UserProfile {
  fullName: string;
  image?: string;
}

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useGetUserProfileQuery(undefined);

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useGetContactUsInfoQuery(undefined);

  const [updateProfileImage, { isLoading: isUploading }] =
    useUpdateProfileImageMutation();

  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null
  );


  const handleProfilePicUpload = async (
    info: UploadChangeParam<UploadFile<File>>
  ) => {
    const file = info.file?.originFileObj || (info.file as unknown as File);
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return message.error("Only JPG, JPEG, or PNG files allowed.");
    }
    if (file.size > 3 * 1024 * 1024) {
      return message.error("File must be smaller than 3MB.");
    }

    const previewUrl = URL.createObjectURL(file);
    setProfilePicPreview(previewUrl);

    try {
      const res = await updateProfileImage(file).unwrap();
      message.success(res.message || "Profile image updated successfully!");
      setProfilePicPreview(res.data.image);
      await refetchUser();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data: { message?: string } }).data.message ===
        "string"
      ) {
        message.error((error as { data: { message: string } }).data.message);
      } else {
        message.error("Failed to update profile.");
      }
    }
  };


  if (isUserLoading || isCompanyLoading) return <ProfileLayoutSkeleton />;
  if (isUserError || isCompanyError || !userData?.data || !companyData?.data)
    return <p>Failed to load profile.</p>;

  const user: UserProfile = userData.data;
  const company: CompanyInfo = companyData.data;
  const profilePicUrl = profilePicPreview || user.image;

  return (
    <div className="dark:text-white">
      <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
        <Breadcrumb
          items={[
            {
              title: (
                <Link href="/">
                  <p className="dark:text-white">Home</p>
                </Link>
              ),
            },
            {
              title: (
                <Link href="/myprofile">
                  <p className="dark:text-white">My Account</p>
                </Link>
              ),
            },
          ]}
        />
      </div>

      {/* Avatar */}
      <div className="flex justify-center items-center w-full p-5 gap-5">
        <div className="relative">
          <Avatar
            size={140}
            src={profilePicUrl}
            className="dark:border-2 !dark:border-primary shadow-xl"
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <Spin />
            </div>
          )}
          <Upload
            name="profileImage"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleProfilePicUpload}
            accept=".jpg,.jpeg,.png"
            maxCount={1}
            multiple={false}
            disabled={isUploading}
            className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
          >
            <button
              type="button"
              onClick={() => console.log("Camera clicked")}
              className="flex items-center justify-center"
            >
              <FaCamera className="text-white mt-[5px] w-6" />
            </button>
          </Upload>
        </div>
      </div>

      <div>
        <h2 className="text-center text-4xl font-semibold">{user.fullName}</h2>
      </div>

      {/* Main */}
      <div className="py-10 md:py-16 px-3 md:px-0">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Welcome to your account!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Update your details, manage addresses and keep your account secure.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  If you need any help{" "}
                  <span className="text-orange-500">contact us:</span>
                </p>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-700 dark:text-white" />
                  <span>{company.phoneNumber}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-700 dark:text-white" />
                  <span>{company.email}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-700 mt-1 dark:text-white" />
                  <span>{company.location}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
