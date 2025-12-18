/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect } from "react";
// import { Form, Input, notification } from "antd";
// import { useEditUserProfileMutation, useGetUserProfileQuery } from "@/redux/features/auth/authApi";

// interface EditFormValues {
//   fullName: string;
//   phoneNumber: string;
//   companyName?: string;
//   companyEmail?: string;
//   contactInfo?: string;
//   address?: string;
//   payoutInfo?: string;
// }

// const EditAccount = () => {
//   const [form] = Form.useForm<EditFormValues>();
//   const [api, contextHolder] = notification.useNotification();

//   const { data: userData, isLoading: isLoadingProfile, isError } = useGetUserProfileQuery(undefined);
//   const [editProfile, { isLoading: isUpdating }] = useEditUserProfileMutation();

//   useEffect(() => {
//     if (userData?.data) {
//       const user = userData.data;
//       form.setFieldsValue({
//         fullName: user.fullName,
//         phoneNumber: user.phoneNumber,
//         companyName: user.companyName || "",
//         companyEmail: user.companyEmail || "",
//         contactInfo: user.contactInfo || "",
//         address: user.address || "",
//         payoutInfo: user.payoutInfo || "",
//       });
//     }
//   }, [userData, form]);

//   const onFinish = async (values: EditFormValues) => {
//     try {
//       await editProfile(values).unwrap();
//       api.open({
//         type: "success",
//         message: "Profile Updated",
//         description: "Your profile is updated successfully!",
//         placement: "topRight",
//       });
//       window.location.reload();
//     } catch {
//       api.open({
//         type: "error",
//         message: "Update Failed",
//         description: "Failed to update profile. Please try again.",
//         placement: "topRight",
//       });
//     }
//   };

//   if (isLoadingProfile) return <p className="text-white">Loading...</p>;
//   if (isError || !userData?.data) return <p className="text-white">Failed to load user data.</p>;

//   // const user = userData.data;

//   return (<div className="space-y-8 bg-white dark:bg-black p-6 rounded-md">
//     {contextHolder} <h2 className="text-xl font-medium dark:text-white">Edit Account</h2>

//     <Form<EditFormValues>
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       autoComplete="off"
//       className="space-y-4"
//     >

//       <Form.Item
//         label={<span className="dark:text-white">Company Name</span>}
//         name="companyName"
//       >
//         <Input
//           className="h-12 bg-white text-black dark:bg-white dark:text-black"
//           placeholder="Enter your company name"
//         />
//       </Form.Item>

//       <Form.Item
//         label={<span className="dark:text-white">Company Email</span>}
//         name="companyEmail"
//       >
//         <Input
//           className="h-12 bg-white text-black dark:bg-white dark:text-black"
//           placeholder="Enter your company email"
//         />
//       </Form.Item>

//       <Form.Item
//         label={<span className="dark:text-white">Contact Info</span>}
//         name="contactInfo"
//       >
//         <Input
//           className="h-12 bg-white text-black dark:bg-white dark:text-black"
//           placeholder="Enter contact information"
//         />
//       </Form.Item>

//       <Form.Item
//         label={<span className="dark:text-white">Address</span>}
//         name="address"
//       >
//         <Input
//           className="h-12 bg-white text-black dark:bg-white dark:text-black"
//           placeholder="Enter your address"
//         />
//       </Form.Item>

//       <Form.Item
//         label={<span className="dark:text-white">Payout Info</span>}
//         name="payoutInfo"
//       >
//         <Input
//           className="h-12 bg-white text-black dark:bg-white dark:text-black"
//           placeholder="Enter payout information"
//         />
//       </Form.Item>

//       <Form.Item className="mt-6">
//         <button
//           type="submit"
//           className="bg-primary w-full py-3 rounded-md text-white"
//         >
//           {isUpdating ? "Updating..." : "Update Profile"}
//         </button>
//       </Form.Item>
//     </Form>
//   </div>

//   );
// };

// export default EditAccount;


"use client";

import { useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useEditUserProfileMutation, useGetUserProfileQuery } from "@/redux/features/auth/authApi";

interface EditFormValues {
  fullName: string;
  phoneNumber: string;
  companyName?: string;
  companyEmail?: string;
  contactInfo?: string;
  address?: string;
  payoutInfo?: string;
}

const EditAccount = () => {
  const [form] = Form.useForm<EditFormValues>();
  const [api, contextHolder] = notification.useNotification();

  const { data: userData, isLoading: isLoadingProfile, isError } = useGetUserProfileQuery(undefined);
  const [editProfile, { isLoading: isUpdating }] = useEditUserProfileMutation();
  // console.log("User data:", userData);

  // Populate form when user data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      form.setFieldsValue({
        fullName: user.fullName || "",
        phoneNumber: user.phoneNumber || "",
        companyName: user.companyName || "",
        companyEmail: user.companyEmail || "",
        contactInfo: user.contactInfo || "",
        address: user.address || "",
        payoutInfo: user.payoutInfo || "",
      });
    }
  }, [userData, form]);

  // Handle form submission
  const onFinish = async (values: EditFormValues) => {
    try {
      await editProfile(values).unwrap();
      api.open({
        type: "success",
        message: "Profile Updated",
        description: "Your profile has been updated successfully!",
        placement: "topRight",
      });
    } catch (error:any) {
      api.open({
        type: "error",
        message: "Update Failed",
        description: "Failed to update profile. Please try again.",
        placement: "topRight",
      });
    }
  };

  if (isLoadingProfile) return <p className="text-white">Loading...</p>;
  if (isError || !userData?.data) return <p className="text-white">Failed to load user data.</p>;

  return (<div className="space-y-8 bg-white dark:bg-black p-6 rounded-md">
    {contextHolder} <h2 className="text-xl font-medium dark:text-white">Edit Account</h2>

    <Form<EditFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      className="space-y-4"
    >
      <Form.Item label={<span className="dark:text-white">Company Name</span>} name="companyName">
        <Input
          className="h-12 bg-white text-black dark:bg-white dark:text-black"
          placeholder="Enter your company name"
        />
      </Form.Item>

      <Form.Item label={<span className="dark:text-white">Company Email</span>} name="companyEmail">
        <Input
          className="h-12 bg-white text-black dark:bg-white dark:text-black"
          placeholder="Enter your company email"
        />
      </Form.Item>

      <Form.Item label={<span className="dark:text-white">Contact Info</span>} name="contactInfo">
        <Input
          className="h-12 bg-white text-black dark:bg-white dark:text-black"
          placeholder="Enter contact information"
        />
      </Form.Item>

      <Form.Item label={<span className="dark:text-white">Address</span>} name="address">
        <Input
          className="h-12 bg-white text-black dark:bg-white dark:text-black"
          placeholder="Enter your address"
        />
      </Form.Item>

      {/* <Form.Item label={<span className="dark:text-white">Payout Info</span>} name="payoutInfo">
      <Input
        className="h-12 bg-white text-black dark:bg-white dark:text-black"
        placeholder="Enter payout information"
      />
    </Form.Item> */}

      <Form.Item label="Payout Info" name="payoutInfo">
        <Input.TextArea
          className="bg-white text-black dark:bg-white dark:text-black"
          placeholder="Enter payout information"
          rows={4}
        />
      </Form.Item>


      <Form.Item className="mt-6">
        <button
          type="submit"
          className="bg-primary w-full py-3 rounded-md text-white"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </Form.Item>
    </Form>
  </div>

  );
};

export default EditAccount;
