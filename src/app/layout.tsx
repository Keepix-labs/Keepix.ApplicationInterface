import './scss/normalize.scss'
import './scss/variables.scss'
import './scss/globals.scss'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

const satoshi = localFont({ src: '../../fonts/satoshi/Satoshi-Variable.woff2' })
const clashdisplay = localFont({ src: '../../fonts/clashdisplay/ClashDisplay-Variable.woff2' })

export const metadata: Metadata = {
  title: 'Keepix',
  description: 'Staking cryptocurrency at home has never been easier.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        {children}
        </body>
    </html>
  )
}
