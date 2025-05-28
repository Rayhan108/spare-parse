"use client";
// components/TransactionsTableAntd.tsx
import { Table, ConfigProvider } from "antd";
import { LuCalendar } from "react-icons/lu";

interface Transaction {
    key: string;
    date: string;
    account: string;
    method: string;
    email: string;
    amount: string;
}

const data: Transaction[] = [
    {
        key: "1",
        date: "Dec 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "2",
        date: "Nov 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "3",
        date: "Oct 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "4",
        date: "Sep 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "5",
        date: "Aug 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "6",
        date: "Jul 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "7",
        date: "Jul 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "8",
        date: "Jul 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
    {
        key: "9",
        date: "Jun 1, 2022",
        account: "Demo Artist Name",
        method: "Visa",
        email: "hatem@gmail.com",
        amount: "$500.00",
    },
];


const columns = [
    {
        title: "Date",
        dataIndex: "date",
        key: "date",
    },
    {
        title: "Account Name",
        dataIndex: "account",
        key: "account",
        render: (text: string) => <strong>{text}</strong>,
    },
    {
        title: "Withdraw Method",
        dataIndex: "method",
        key: "method",
    },
    {
        title: "E-mail",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
    },
];


export default function TransactionsTableAntd() {
    return (
        <div>
            <div className=" flex justify-between items-center my-5">
                <h2 style={{ fontWeight: 600, marginBottom: 16 }} className=" text-lg sm:text-2xl dark:text-white">Transactions</h2>

                <div style={{ marginBottom: 12, textAlign: "right" }}>
                    <button
                        className=" sm:text-lg border border-primary rounded-lg px-4 py-2 flex gap-2 items-center"
                    >
                        <LuCalendar size={22} className=" text-black dark:text-white" /> <p className=" font-semibold  dark:text-white">Last 10 Transactions</p>
                    </button>
                </div>
            </div>

            <ConfigProvider
                theme={{
                    components: {
                        "Table": {
                            "borderColor": "rgb(250,182,138)",
                            "headerBg": "rgb(254,239,230)",
                            "headerColor": "rgba(32,32,32,0.88)",
                            "colorText": "rgba(0,0,0,0.88)"
                        }
                    },
                }}
            >
                <Table<Transaction>
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                    rowClassName={(_, index) =>
                        index % 2 === 0 ? "ant-table-row-light" : "ant-table-row-dark"
                    }
                    style={{ borderColor: "#fbbf24", borderRadius: 6 }}
                    className=" overflow-x-scroll md:overflow-auto"
                />
            </ConfigProvider>

        </div>
    );
}
