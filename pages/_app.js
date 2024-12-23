import "@/styles/globals.css";
import ParentComponent from "@/components/ParentComponent";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";
import Aos from "@/components/Aos";

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // use userouter hook

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // check if the route is already complete when the component mounts
    if (router.isReady) {
      setLoading(false);
    }

    // add event listeners on component mount
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // remove event listeners on component unmount
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.isReady]); // add router.isReady to the dependency array

  const [asideOpen, setAsideOpen] = useState(false);

  const AsideClickOpen = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      {loading ? (
        // loading while page loads
        <div className="flex flex-col flex-center wh_100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <SessionProvider session={session}>
            <ParentComponent
              appOpen={asideOpen}
              appAsideOpen={AsideClickOpen}
            />
          </SessionProvider>

          <main>
            <Aos>
            <div className={asideOpen ? "container" : "container active"}>
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </div>
            </Aos>
          </main>
        </>
      )}
    </>
  );
}
