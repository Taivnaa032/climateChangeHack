import "@/styles/globals.css";
import SideNavbar from "./sideNavbar";
import TopNavbar from "./topNavbar";

export default function App({ Component, pageProps }) {

  return (
    <>
      <SideNavbar />
      <TopNavbar />
      <Component {...pageProps} />
    </>


  )
}
