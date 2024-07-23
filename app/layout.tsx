import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { theme } from '../theme'

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
}

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.svg' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
        {/* <style>{`
        * {
          border: 1px solid red;
        }
        `}</style> */}
      </head>
      <body style={{ backgroundColor: '#F1F3F5', padding: 32 }}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  )
}
