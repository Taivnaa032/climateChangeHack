import "@/styles/globals.css";
import SideNavbar from "../navbar/sideNavbar";
import TopNavbar from "../navbar/topNavbar";
import AuthProvider from "@/context/Auth";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SideNavbar />
      <TopNavbar />
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
