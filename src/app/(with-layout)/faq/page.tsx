// app/faq/page.tsx
"use client";

import { Breadcrumb, Collapse } from "antd";
import Link from "next/link";

const { Panel } = Collapse;

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How can I place an order?",
    answer:
      "You can place an order by browsing our products, adding them to your cart, and completing the checkout process.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit cards, debit cards, and other online payment methods depending on your location.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once your order is shipped, you will receive a tracking number via email.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day money-back guarantee. Products must be in original condition to qualify for a return.",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our support team via email, phone, or our live chat for assistance.",
  },
];

const FAQ = () => {
  return (
    <div className="container mx-auto py-16 px-3 md:px-0 min-h-screen">
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

      {/* FAQ Accordion */}
      <Collapse
        defaultActiveKey={["0"]}
        accordion
        className="bg-white dark:bg-gray-800 rounded-md shadow-md"
      >
        {faqData.map((faq, idx) => (
          <Panel
            header={<span className="text-lg font-medium">{faq.question}</span>}
            key={idx}
            className="dark:bg-gray-800 dark:text-white"
          >
            <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default FAQ;
