/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinLine } from "react-icons/ri";
import our_story from "../../../../../public/our_story.png";
import { useGetAboutUsQuery } from "@/redux/features/aboutUs/aboutUsApi";
import { useGetFoundingTeamsQuery } from "@/redux/features/foundingTeam/foundingTeam";
import ServiceFeatures from "@/components/Home/ServiceFeatures";
import { useTranslations } from "next-intl";

const About = () => {
  const t = useTranslations("nav");
  const { data, isLoading, isError } = useGetAboutUsQuery();
  const about = data?.data;
  const {
    data: teamData,
    isLoading: isTeamLoading,
    isError: isTeamError,
  } = useGetFoundingTeamsQuery();
  const teamMembers = teamData?.data || [];

  if (isLoading || isTeamLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || isTeamError) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load content.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-8 md:mb-12">
          <Breadcrumb
            items={[
              {
                title: (
                  <Link href="/">
                    <span className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                      {t("home")}
                    </span>
                  </Link>
                ),
              },
              {
                title: (
                  <span className="text-gray-900 dark:text-white font-medium">
                    {t("about")}
                  </span>
                ),
              },
            ]}
          />
        </div>

        {/* Our Story Section */}
        <section className="mb-16 md:mb-20 lg:mb-24">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
            {/* Content */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                {about?.heading || "Our Story"}
              </h1>
              <div
                className="space-y-4 md:space-y-6 text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: about?.content || "" }}
              />
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square max-w-md mx-auto lg:max-w-none">
                <Image
                  src={our_story}
                  alt="Our Story"
                  fill
                  className="object-cover rounded-2xl shadow-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Founding Team Section */}
        <section className="mb-16 md:mb-20 lg:mb-24">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
              The passionate individuals behind our success
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {teamMembers.map((member: any) => (
              <div
                key={member.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Team Member Image */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Team Member Info */}
                <div className="p-5 md:p-6">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm md:text-base font-medium mb-4">
                    {member.role}
                  </p>

                  {/* Social Links */}
                  <div className="flex gap-3 items-center">
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all duration-300"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <FaXTwitter size={18} />
                      </a>
                    )}
                    {member.instagram && (
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                        aria-label={`${member.name}'s Instagram`}
                      >
                        <FaInstagram size={18} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <RiLinkedinLine size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Service Features Section */}
        <section>
          <ServiceFeatures />
        </section>
      </div>
    </div>
  );
};

export default About;