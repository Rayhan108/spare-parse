/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Input, Button, Upload, App } from "antd";
import {
  CloudUploadOutlined,
  ShopOutlined,
  PhoneOutlined,
  HomeOutlined,
  BankOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import Image from "next/image";

import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useRegisterSellerMutation } from "@/redux/features/seller/profile/ProfileApi";

const { TextArea } = Input;

interface SellerFormData {
  companyName: string;
  contactInfo: string;
  address: string;
  payoutInfo: string;
}

interface SellerRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void
}

const SellerRegistrationForm: React.FC<SellerRegistrationFormProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { message } = App.useApp();
  
  // API Hooks
  const [registerSeller, { isLoading }] = useRegisterSellerMutation();
  const { refetch: refetchProfile } = useGetUserProfileQuery(undefined);

  // Local States
  const [logoFile, setLogoFile] = useState<UploadFile | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SellerFormData>({
    defaultValues: {
      companyName: "",
      contactInfo: "",
      address: "",
      payoutInfo: "",
    },
  });

  // Handle logo file change
  const handleLogoChange: UploadProps["onChange"] = ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      // Validate file size (2MB limit)
      if (file.originFileObj && file.originFileObj.size > 2 * 1024 * 1024) {
        message.error("Logo file size must be less than 2MB!");
        return;
      }
      
      setLogoFile(file);
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setLogoPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file.originFileObj);
      }
    } else {
      setLogoFile(null);
      setLogoPreview(null);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: SellerFormData) => {
    // Validate logo
    if (!logoFile?.originFileObj) {
      message.error("Please upload your company logo!");
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("logo", logoFile.originFileObj);

    const bodyData = {
      companyName: data.companyName,
      contactInfo: data.contactInfo,
      address: data.address,
      payoutInfo: data.payoutInfo,
    };

    formData.append("bodyData", JSON.stringify(bodyData));

    try {
      const res = await registerSeller(formData).unwrap();
      
      message.success(res?.message || "Seller registration successful! 🎉");
      
      // Refresh profile to update isSeller status
      await refetchProfile();
      
      // Reset form and close modal
      handleReset();
      onClose();
      
      // Call optional success callback
      onSuccess?.();
      
    } catch (error: any) {
      console.error("Seller registration error:", error);
      message.error(
        error?.data?.message || 
        error?.message || 
        "Failed to register as seller. Please try again."
      );
    }
  };

  // Reset form state
  const handleReset = () => {
    reset();
    setLogoFile(null);
    setLogoPreview(null);
  };

  // Handle modal cancel
  const handleCancel = () => {
    if (isLoading) return; // Prevent closing while loading
    handleReset();
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      closable={!isLoading}
      maskClosable={!isLoading}
      destroyOnClose
      className="seller-registration-modal"
      styles={{
        body: { padding: 0 },
        content: { borderRadius: "16px", overflow: "hidden" },
      }}
    >
      <div className="relative">
        {/* Header with Gradient */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 px-8 py-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ShopOutlined className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold m-0">Become a Seller</h2>
              <p className="text-orange-100 m-0 text-sm">
                Complete your seller profile to start selling
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8">
          {/* Logo Upload Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-3 text-base">
              Company Logo <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-6">
              {/* Logo Preview */}
              <div className="relative w-28 h-28 rounded-xl border-2 border-dashed border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center overflow-hidden transition-all hover:border-orange-500 hover:shadow-lg">
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Logo Preview"
                    fill
                    className="object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center p-2">
                    <CloudUploadOutlined className="text-4xl text-orange-400" />
                    <p className="text-xs text-gray-500 mt-1">Upload Logo</p>
                  </div>
                )}
              </div>

              {/* Upload Button */}
              <div className="flex-1">
                <Upload
                  accept="image/*"
                  maxCount={1}
                  fileList={logoFile ? [logoFile] : []}
                  onChange={handleLogoChange}
                  beforeUpload={() => false}
                  showUploadList={false}
                  disabled={isLoading}
                >
                  <Button
                    icon={<CloudUploadOutlined />}
                    size="large"
                    disabled={isLoading}
                    className="border-orange-400 text-orange-600 hover:bg-orange-50 hover:border-orange-500 h-12 px-6 font-medium"
                  >
                    {logoFile ? "Change Logo" : "Choose Logo"}
                  </Button>
                </Upload>
                <p className="text-gray-400 text-xs mt-2">
                  PNG, JPG or WEBP (Max 2MB)
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="space-y-5">
            {/* Company Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="companyName"
                control={control}
                rules={{
                  required: "Company name is required",
                  minLength: {
                    value: 2,
                    message: "Company name must be at least 2 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Company name must be less than 100 characters",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={
                      <ShopOutlined className="text-orange-400 text-lg mr-2" />
                    }
                    placeholder="Enter your company name"
                    size="large"
                    disabled={isLoading}
                    status={errors.companyName ? "error" : ""}
                    className="rounded-lg h-12 hover:border-orange-400 focus:border-orange-500"
                  />
                )}
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Contact Information <span className="text-red-500">*</span>
              </label>
              <Controller
                name="contactInfo"
                control={control}
                rules={{
                  required: "Contact information is required",
                  minLength: {
                    value: 5,
                    message: "Please provide valid contact information",
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    prefix={
                      <PhoneOutlined className="text-orange-400 text-lg mr-2" />
                    }
                    placeholder="Email, Phone (e.g., support@company.com, +1-xxx-xxx-xxxx)"
                    size="large"
                    disabled={isLoading}
                    status={errors.contactInfo ? "error" : ""}
                    className="rounded-lg h-12 hover:border-orange-400 focus:border-orange-500"
                  />
                )}
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactInfo.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Business Address <span className="text-red-500">*</span>
              </label>
              <Controller
                name="address"
                control={control}
                rules={{
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Please enter a complete address",
                  },
                }}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Enter your full business address"
                    rows={3}
                    disabled={isLoading}
                    status={errors.address ? "error" : ""}
                    className="rounded-lg hover:border-orange-400 focus:border-orange-500"
                    style={{ resize: "none" }}
                  />
                )}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
              <div className="flex items-center gap-1 mt-1 text-gray-400">
                <HomeOutlined className="text-sm" />
                <span className="text-xs">
                  Include street, city, state, and country
                </span>
              </div>
            </div>

            {/* Payout Info */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Payout Information <span className="text-red-500">*</span>
              </label>
              <Controller
                name="payoutInfo"
                control={control}
                rules={{
                  required: "Payout information is required",
                  minLength: {
                    value: 10,
                    message: "Please provide complete payout details",
                  },
                }}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    placeholder="Bank Transfer - Account No: XXXXXXXXX, Routing No: XXXXXXXXX"
                    rows={3}
                    disabled={isLoading}
                    status={errors.payoutInfo ? "error" : ""}
                    className="rounded-lg hover:border-orange-400 focus:border-orange-500"
                    style={{ resize: "none" }}
                  />
                )}
              />
              {errors.payoutInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.payoutInfo.message}
                </p>
              )}
              <div className="flex items-center gap-1 mt-1 text-gray-400">
                <BankOutlined className="text-sm" />
                <span className="text-xs">
                  Your earnings will be transferred to this account
                </span>
              </div>
            </div>
          </div>

          {/* Terms Notice */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-3">
              <CheckCircleOutlined className="text-blue-500 text-lg mt-0.5" />
              <p className="text-gray-600 text-sm m-0">
                By submitting this form, you agree to our{" "}
                <span className="text-orange-600 font-medium cursor-pointer hover:underline">
                  Seller Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="text-orange-600 font-medium cursor-pointer hover:underline">
                  Privacy Policy
                </span>
                .
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleCancel}
              size="large"
              disabled={isLoading}
              className="flex-1 h-12 rounded-lg font-semibold text-gray-600 border-gray-300 hover:border-gray-400"
            >
              Cancel
            </Button>
            <button
             
              type="submit"
             
            //   loading={isLoading}
              className="flex-1 h-12 rounded-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 border-none hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200"
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100/50 to-transparent rounded-tr-full pointer-events-none" />
      </div>
    </Modal>
  );
};

export default SellerRegistrationForm;