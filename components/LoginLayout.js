import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && router.pathname !== '/') {
            router.push('/'); // Redirect to home page after successful login
        } else if (status === 'unauthenticated' && router.pathname !== '/auth/signup' && router.pathname !== '/auth/signin') {
            router.push('/auth/signup'); // Redirect to signup page if user is not authenticated
        }
    }, [status, router]);

    if (status === 'loading') {
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading</div>
        </div>
    }

    return session ? <>{children}</> : null;
}