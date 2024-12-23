import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/'); // Redirect to home page after successful login
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading</div>
        </div>
    }

    if (!session) {
        router.push('/auth/signin');
        return null;
    }

    if (session) {
        
        return <>
            {children}
        </>;
    }
}