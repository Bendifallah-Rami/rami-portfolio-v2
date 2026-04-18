import "../style/globals.css"
import { Montserrat, Open_Sans } from 'next/font/google'
import ThemeToggle from '../components/ui/ThemeToggle'
import { seoMetadata } from '../data/seo'


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
  metadataBase: new URL(seoMetadata.url || 'http://localhost:3000'),
  title: seoMetadata.title,
  description: seoMetadata.description,
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: seoMetadata.url,
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [
      {
        url: '/portfolio.png',
        width: 1200,
        height: 630,
        alt: seoMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: ['/portfolio.png'],
  },
  authors: [{ name: seoMetadata.author }],
  creator: seoMetadata.author,
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
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
