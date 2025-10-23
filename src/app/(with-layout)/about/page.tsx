"use client";

import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinLine } from "react-icons/ri";

import our_story from "../../../../public/our_story.png";
import delivery from "../../../../public/service/delivery.svg";
import customer_service from "../../../../public/service/customer_service.svg";
import money_back from "../../../../public/service/money_back.svg";

import { useGetAboutUsQuery } from "@/redux/features/aboutUs/aboutUsApi";
import { useGetFoundingTeamsQuery } from "@/redux/features/foundingTeam/foundingTeam";


const About = () => {
  // Fetch About Us data
  const { data, isLoading, isError } = useGetAboutUsQuery();
  const about = data?.data;

  // Fetch Founding Team data
  const { data: teamData, isLoading: isTeamLoading, isError: isTeamError } = useGetFoundingTeamsQuery();


  const teamMembers = teamData?.data || [];

  if (isLoading || isTeamLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError || isTeamError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">Failed to load content.</p>
      </div>
    );

  return (
    <div className="relative px-3 md:px-0">
      <div className="container mx-auto py-16">
        {/* Breadcrumb */}
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
                <Link href="/about">
                  <p className="dark:text-white">About</p>
                </Link>
              ),
            },
          ]}
        />

        {/* Our Story Section */}
        <div className="flex dark:text-white items-start">
          <div className="md:w-1/2 h-[400px] 2xl:h-[700px] flex flex-col justify-center">
            <h2 className="text-5xl font-bold">{about?.heading || "Our Story"}</h2>
            <p className="mt-5 text-lg">
              {about?.content ||
                "At Sparedoc, we're transforming the way you shop for car parts. As a trusted e-commerce platform, we offer a wide selection of genuine and aftermarket auto components, accessories, and tools."}
            </p>
          </div>
          <div className="relative">
            <Image
              src={our_story}
              className="hidden lg:block w-[450px] 2xl:w-[750px]"
              height={500}
              width={500}
              alt="our story"
            />
          </div>
        </div>

        {/* Founding Team Section */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-14 dark:text-white">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
              />
              <div className="mt-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">{member.name}</h2>
                <p className="text-md md:text-lg lg:text-xl mb-3">{member.role}</p>
                <div className="flex gap-4 items-center">
                  {member.twitter && <FaXTwitter size={25} />}
                  {member.instagram && <FaInstagram size={25} />}
                  {member.linkedin && <RiLinkedinLine size={25} />}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Service Section */}
        <div className="px-3 xl:px-0 xl:w-[1100px] mx-auto py-16 md:py-20 dark:text-white">
          <div className="flex flex-col md:flex-row gap-16 md:gap-0 justify-between">
            <div className="flex flex-col justify-center items-center">
              <Image
                src={delivery}
                height={500}
                width={500}
                alt="delivery"
                className="w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10"
              />
              <h2 className="text-xl font-bold mb-2">FAST DELIVERY</h2>
              <p>Free delivery for all orders over $140</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Image
                src={customer_service}
                height={500}
                width={500}
                alt="customer service"
                className="w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10"
              />
              <h2 className="text-xl font-bold mb-2">24/7 CUSTOMER SERVICE</h2>
              <p>Friendly 24/7 customer support</p>
            </div>

            <div className="flex flex-col justify-center items-center">
              <Image
                src={money_back}
                height={500}
                width={500}
                alt="money back"
                className="w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10"
              />
              <h2 className="text-xl font-bold mb-2">MONEY BACK GUARANTEE</h2>
              <p>We return money within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
