import { Html, Head, Main, NextScript } from 'next/document'
import i18nextConfig from '../next-i18next.config'

export default function Document(props) {
  const currentLocale = props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale
  return (
    <Html className="h-full bg-gray-100" lang={currentLocale}>
      <Head />
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
