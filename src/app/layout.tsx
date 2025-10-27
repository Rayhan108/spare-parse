// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { ConfigProvider } from "antd";
// import { mainTheme } from "@/theme/ant-theme";
// import ClientProviders from "@/utils/ClientProviders";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Hatem E-commerce",
//   description: "E-commerce platform with social login",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black`}
//       >
//         <ConfigProvider theme={mainTheme as any}>
//           <ClientProviders>{children}</ClientProviders>
//         </ConfigProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider, ThemeConfig } from "antd";
import { mainTheme } from "@/theme/ant-theme";
import ClientProviders from "@/utils/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hatem E-commerce",
  description: "E-commerce platform with social login",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-black`}
      >
        {/* ✅ ConfigProvider typed safely using Ant Design’s ThemeConfig */}
        <ConfigProvider theme={mainTheme as ThemeConfig}>
          <ClientProviders>{children}</ClientProviders>
        </ConfigProvider>
      </body>
    </html>
  );
}

