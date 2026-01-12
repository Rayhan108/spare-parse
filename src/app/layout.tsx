// import type { Metadata } from "next";
// import { Inter } from "next/font/google";

// import "./globals.css";
// import { App as AntdApp, ConfigProvider, ThemeConfig } from "antd";
// import { mainTheme } from "@/theme/ant-theme";
// import ClientProviders from "@/utils/ClientProviders";
// import { Toaster } from "react-hot-toast";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });
// const inter = Inter({
//   variable: "--font-inter",
//   subsets: ["latin"],
// });
// // const geistMono = Geist_Mono({
// //   variable: "--font-geist-mono",
// //   subsets: ["latin"],
// // });

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
//         className={`${inter.variable} antialiased dark:bg-black`}
//       >
//         {/* ✅ Wrap in ConfigProvider (theme + locale) */}
//         <ConfigProvider theme={mainTheme as ThemeConfig}>
//           {/* ✅ Wrap with Ant Design App for message/notification/modal context */}
//           <Toaster/>
//           <AntdApp>
//             <ClientProviders>{children}</ClientProviders>
//           </AntdApp>
//         </ConfigProvider>
//       </body>
//     </html>
//   );
// }
// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/utils/ClientProviders";

import { Toaster } from "react-hot-toast"; 
import { ThemeProvider } from "@/Providers/ThemeProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpareDoc",
  description: "Spare parse for vehicles",
};

// Prevent flash - only apply dark if stored
const themeScript = `
  (function() {
    try {
      if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
      }
    } catch (e) {}
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} antialiased dark:bg-black`}>
        <ThemeProvider>
          <Toaster />
          <ClientProviders>{children}</ClientProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}