import { ConfigProvider } from "antd"

export const metadata = {
  title: 'Sparedoc',
  description: 'spare pars for vehicles',
}
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
  children: React.ReactNode
}) {
  return (
    <div>
          <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <ConfigProvider
      
      >

        {children}

      </ConfigProvider>
    </div>
  )
}
