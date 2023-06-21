import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
//import { SessionProvider } from "next-auth/react"
import { initializeApp } from "firebase/app";
import { firebaseClientInitConfig } from '@/services/firebaseConfig'

initializeApp(firebaseClientInitConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
/*
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}*/

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp/*, nextI18NextConfig */)
