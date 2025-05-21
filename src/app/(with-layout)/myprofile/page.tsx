"use client"
import AccountDetails from "@/components/MyProfile/AccountDetails";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Breadcrumb, Upload } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaCamera, FaEnvelope, FaPhone } from "react-icons/fa6";

const MyProfile = () => {

    const [profilePic, setProfilePic] = useState<File | null>(null);
    const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;
    const handleProfilePicUpload = (e: any) => {
        setProfilePic(e.file);
    };

    return (

        <div>
            <div className=" container mx-auto py-10 md:py-16 px-3 md:px-0">
                <Breadcrumb
                    items={[
                        {
                            title: <Link href={`/`}><p className="dark:text-white">Home</p></Link>,
                        },
                        {
                            title: <Link className="dark:text-white" href={`/cart`}><p className="dark:text-white text-black">My Account</p></Link>,
                        },
                    ]}
                />
            </div>


            <div className="flex justify-center items-center text-white w-full mx-auto p-5 gap-5 rounded-md">
                <div className="relative">
                    <Avatar
                        size={140}
                        src={profilePicUrl}
                        className="border-4 border-buttonPrimary shadow-xl"
                    />
                    <Upload
                        showUploadList={false}
                        beforeUpload={() => false}
                        onChange={handleProfilePicUpload}
                        className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
                    >
                        <FaCamera className="text-white mt-[5px] w-6" />
                    </Upload>
                </div>
            </div>

            <div>
                <h2 className=" text-center text-4xl font-semibold">TA Emon</h2>
            </div>

            <div className=" py-10 md:py-16 px-3 md:px-0">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left Column - Welcome Section */}
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-medium">Welcome to your account!</h1>
                                <p className="text-gray-600">Update your details, manage addresses and keep your account secure.</p>
                            </div>

                            <div className="space-y-4">
                                <p className="">
                                    If you need any help <span className="text-orange-500">contact us:</span>
                                </p>

                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-gray-700" />
                                    <span className="">839949950252</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-700" />
                                    <span className="">infocompany@gmail.com</span>
                                </div>

                                <div className="flex items-start gap-3">
                                    <FaMapMarkerAlt className="text-gray-700 mt-1" />
                                    <span className="">
                                        2118 Thornridge Cir. Syracuse,
                                        <br />
                                        Connecticut 35624
                                    </span>
                                </div>
                            </div>
                        </div>

                        <AccountDetails></AccountDetails>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;