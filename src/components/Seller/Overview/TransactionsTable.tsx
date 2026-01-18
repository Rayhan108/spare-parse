"use client";

import { useGetSalesReportQuery } from "@/redux/features/Sales/salesReportApi";
import { Table, ConfigProvider, Spin } from "antd";
import { useTranslations } from "next-intl";
import { LuCalendar } from "react-icons/lu";

interface Transaction {
  key: string;
  date: string;
  account: string;
  method: string;
  email: string;
  amount: string;
}

export default function TransactionsTableAntd() {
   const t = useTranslations("sellerOverview");
  const { data, isLoading, error } = useGetSalesReportQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Spin size="large" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Failed to load orders.</p>
      </div>
    );


  const tableData: Transaction[] =
    data?.data.map((item,) => ({
      key: item.orderId,
      date: new Date(item.orderDate).toLocaleDateString(),
      account: item.customerName,
      method: item.paymentMethod,
      email: item.customerEmail,
      amount: `dzd ${item?.paymentAmount?.toFixed(2)}`,
    })) || [];

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Account Name",
      dataIndex: "account",
      key: "account",
      render: (text: string) => <strong>{text}</strong>,
    },
    { title: "Withdraw Method", dataIndex: "method", key: "method" },
    { title: "E-mail", dataIndex: "email", key: "email" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center my-5">
        <h2
          style={{ fontWeight: 600, marginBottom: 16 }}
          className="text-lg sm:text-2xl dark:text-white"
        >
             {t("transactionsTitle")}
        </h2>

        <div style={{ marginBottom: 12, textAlign: "right" }}>
          <button className="sm:text-lg border border-primary rounded-lg px-4 py-2 flex gap-2 items-center">
            <LuCalendar size={22} className="text-black dark:text-white" />{" "}
            <p className="font-semibold dark:text-white"> {t("lastTransactionsButton")}</p>
          </button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: "rgb(250,182,138)",
              headerBg: "rgb(254,239,230)",
              headerColor: "rgba(32,32,32,0.88)",
              colorText: "rgba(0,0,0,0.88)",
            },
          },
        }}
      >
        <Table<Transaction>
          columns={columns}
          dataSource={tableData}
          pagination={false}
          bordered
          rowClassName={(_, index) =>
            index % 2 === 0 ? "ant-table-row-light" : "ant-table-row-dark"
          }
          style={{ borderColor: "#fbbf24", borderRadius: 6 }}
          className="overflow-x-scroll md:overflow-auto"
        />
      </ConfigProvider>
    </div>
  );
}
