import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return; // Do nothing while loading
        if (!session) router.push('/auth/signin'); // Redirect if not authenticated
    }, [session, status, router]);

    if (status === 'loading') {
        // Loading animation 
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading...</div>
        </div>
    }

    if (session) {
        return <>
            {children}
        </>;
    }

    return null; // Return null while redirecting
}