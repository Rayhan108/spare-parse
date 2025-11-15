"use client"

import { ConfigProvider, Input, notification } from "antd"
import Link from "next/link"
import { AiOutlineSend } from "react-icons/ai"
import { LuCopyright } from "react-icons/lu"
import { RiFacebookLine } from "react-icons/ri"
import { FaXTwitter } from "react-icons/fa6"
import { IoLogoInstagram } from "react-icons/io"
import { PiTiktokLogoLight } from "react-icons/pi"
import { useState } from "react"
import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi"
import { useSubscribeNewsletterMutation } from "@/redux/features/newsletter/newsletterApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"

const Footer = () => {
  const { data, isError } = useGetContactUsInfoQuery()
  const [email, setEmail] = useState<string>("")
  const [subscribeNewsletter, { isLoading: isSubscribing }] = useSubscribeNewsletterMutation()
  const [api, contextHolder] = notification.useNotification()
  const user = useSelector(selectCurrentUser);
  console.log("user------->",user);
  const role = user?.role
  if (isError || !data?.data) return <p className="text-center text-white py-10">Failed to load footer info</p>

  const contact = data.data

  const handleSubscribe = async () => {
    if (!email) {
      api.warning({ message: "Please enter an email" })
      return
    }

    try {
      const response = await subscribeNewsletter({ email }).unwrap()
      api.success({ message: "Subscribed", description: response.message || "You have successfully subscribed!" })
      setEmail("")
    } catch (err: unknown) {
      let errorMessage = "Something went wrong"
      if (err && typeof err === "object" && err !== null) {
        if ("data" in err && typeof err.data === "object" && err.data !== null) {
          const data = err.data as { message?: string }
          if (data.message) errorMessage = data.message
        } else if ("error" in err && typeof err.error === "string") {
          errorMessage = err.error
        }
      } else if (err instanceof Error) {
        errorMessage = err.message
      }
      api.error({ message: "Subscription Failed", description: errorMessage })
    }
  }

  return (
    <div className='bg-[#383838] dark:bg-[#1d1d1d] px-3 lg:px-0'>
      {contextHolder}
      <div className="container mx-auto py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 justify-between">

        {/* Subscribe */}
        <div>
          <h2 className="text-2xl text-white mb-4">Exclusive</h2>
          <p className="text-xl text-white mb-4">Subscribe</p>
          {/* <p className="text-lg text-white mb-3">Get 10% off your first order</p> */}
          <ConfigProvider theme={{
            components: {
              Input: {
                hoverBg: "rgba(255,0,0,0)",
                activeBg: "rgba(255,0,0,0)",
                addonBg: "rgba(0,0,0,0)",
                activeBorderColor: "rgb(255,255,255)",
                hoverBorderColor: "rgb(255,255,255)",
                colorPrimaryHover: "rgb(255,255,255)",
                colorPrimaryActive: "rgb(255,255,255)",
                colorBorder: "rgb(255,255,255)",
                controlHeight: 38,
                borderRadius: 3,
                colorBgContainer: "rgba(255,0,0,0)",
                colorText: "rgba(237,237,237,0.88)",
              }
            }
          }}>
            <Input
              className="custom-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onPressEnter={handleSubscribe}
              suffix={
                isSubscribing ? (
                  <div className="flex items-center justify-center w-5 h-5">
                    <ConfigProvider
                      theme={{
                        components: {
                          Spin: { colorPrimary: "white" },
                        },
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      </div>
                    </ConfigProvider>
                  </div>
                ) : (
                  <AiOutlineSend
                    className="text-white cursor-pointer hover:scale-110 transition-transform"
                    size={20}
                    onClick={handleSubscribe}
                  />
                )
              }

            />
          </ConfigProvider>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-2xl text-white mb-4">Support</h2>
          <p className="text-white">{contact.location}</p>
          <p className="text-white">{contact.email}</p>
          <p className="text-white">{contact.phoneNumber}</p>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-2xl text-white mb-4">Account</h2>
          <div className="flex flex-col gap-5 text-white">
            <Link href={'/myprofile'}>My Account</Link>
       {role === "BUYER" && (
          <>
            <Link href="/cart">Cart</Link>
            <Link href="/wishlist">Wishlist</Link>
          </>
        )}
           
            <Link href={'/product'}>Shop</Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl text-white mb-4">Quick Link</h2>
          <div className="flex flex-col gap-5 text-white">
            <Link href={'/privacy-policy'}>Privacy Policy</Link>
            <Link href={'/terms-and-conditions'}>Terms Of Use</Link>
            <Link href={'/faq'}>FAQ</Link>
            <Link href={'/contact'}>Contact</Link>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-2xl text-white mb-4">Join With US</h2>
          <div className="flex gap-3">
            {contact.facebook && <a href={contact.facebook} target="_blank" rel="noreferrer"><RiFacebookLine size={30} className="text-white cursor-pointer" /></a>}
            {contact.twitter && <a href={contact.twitter} target="_blank" rel="noreferrer"><FaXTwitter size={25} className="text-white cursor-pointer" /></a>}
            {contact.instagram && <a href={contact.instagram} target="_blank" rel="noreferrer"><IoLogoInstagram size={27} className="text-white cursor-pointer" /></a>}
            {contact.linkedin && <a href={contact.linkedin} target="_blank" rel="noreferrer"><PiTiktokLogoLight size={27} className="text-white cursor-pointer" /></a>}
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="flex items-center justify-center text-white border-t border-primary py-4">
        <LuCopyright size={22} />
        <p className="text-sm md:text-lg ml-2">Copyright Sparedoc 2025. All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
