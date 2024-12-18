
import "@/styles/globals.css";
import ParentComponent from "@/components/ParentComponent";

export default function App({ Component, pageProps }) {


  return <>
    <ParentComponent />
    <Component {...pageProps} />
  </>
}
