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
        theme={{
          components: {
            "Input": {
              "activeBorderColor": "rgb(245,97,0)",
              "hoverBorderColor": "rgb(245,97,0)",
            }
          },
        }}
      >

        {children}

      </ConfigProvider>
    </div>
  )
}
