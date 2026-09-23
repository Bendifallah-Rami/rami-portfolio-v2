import "../style/globals.css"
import { Montserrat, Open_Sans } from 'next/font/google'
import ThemeToggle from '../components/ui/ThemeToggle'
import TypingGameButton from '../components/ui/TypingGameButton'
import { seoMetadata } from '../data/seo'


const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  'http://localhost:3000'

const siteUrl = /^https?:\/\//.test(rawSiteUrl)
  ? rawSiteUrl
  : `https://${rawSiteUrl}`

const socialPreviewImageUrl = new URL(seoMetadata.image, siteUrl).toString()

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: seoMetadata.title,
  description: seoMetadata.description,
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: seoMetadata.title,
    description: seoMetadata.description,
    images: [
      {
        url: socialPreviewImageUrl,
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
    images: [socialPreviewImageUrl],
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
        <TypingGameButton />
      </body>
    </html>
  );
}
