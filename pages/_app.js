
import "@/styles/globals.css";
import ParentComponent from "@/components/ParentComponent";
import { useState } from "react";

export default function App({ Component, pageProps }) {

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen)
  }



  return <>
    <ParentComponent appOpen={asideOpen} appAsideOpen={AsideClickOpen} />
    <Component {...pageProps} />
  </>
}
