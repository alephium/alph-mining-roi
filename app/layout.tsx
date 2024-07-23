import '@mantine/core/styles.css'
import React from 'react'
import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import { theme } from '../theme'

export const metadata = {
  title: 'ALPH mining ROI estimator',
  description: 'Simple ROI calculator for ALPH mining based on the current network hashrate and ALPH price. Not Financial Advice.',
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
