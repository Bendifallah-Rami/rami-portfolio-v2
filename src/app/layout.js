import "../style/globals.css"
import { Montserrat, Open_Sans } from 'next/font/google'
import ThemeToggle from '../components/ui/ThemeToggle'


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '900'],
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata = {
  title: "rami portfolio",
  description: "my second portofolio",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${montserrat.variable} ${openSans.variable} h-full antialiased bg-blend-darken`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <ThemeToggle initialTheme="dark" />
      </body>
    </html>
  );
}
