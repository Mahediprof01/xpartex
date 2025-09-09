import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { ConditionalLayout } from '../components/conditional-layout'
import ToastContainer from '@/components/ui/toast'
import ChatWidget from '@/components/chat-widget'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Xpartex',
  description: 'Empowering textile, garment, and fabric businesses with premium sourcing solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <ChatWidget />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  )
}
