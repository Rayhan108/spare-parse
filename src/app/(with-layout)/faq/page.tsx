"use client";

import { Breadcrumb, Collapse, Spin } from "antd";
import Link from "next/link";
import { useGetFaqsQuery } from "@/redux/features/faq/faqApi";
const { Panel } = Collapse;

const FaqPage = () => {
  const { data, isLoading, isError } = useGetFaqsQuery();
  const faqs = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">Failed to load FAQs.</p>
      </div>
    );

  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
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
              <Link href="/faq">
                <p className="dark:text-white">FAQ</p>
              </Link>
            ),
          },
        ]}
      />

      {/* Page Heading */}
      <h1 className="text-4xl md:text-5xl font-bold my-8 dark:text-white">
        Frequently Asked Questions
      </h1>

      {/* FAQ List */}
      <Collapse accordion>
        {faqs?.map((faq) => (
          <Panel header={faq.question} key={faq.id}>
            <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FaqPage;
