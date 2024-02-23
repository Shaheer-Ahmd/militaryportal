import "@/styles/globals.css";
import Nav from "./auth/Nav";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session = {pageProps.session}>
      <Nav/>
      <Component {...pageProps} />
    </SessionProvider>
  ) 
}
