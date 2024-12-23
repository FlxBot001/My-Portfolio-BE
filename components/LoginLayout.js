import { useSession } from "next-auth/react"
import { useRouter } from "next/router";



export default function LoginLayout({ children }) {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        // Loading animation 
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading...</div>
        </div>
    }
    // router object
    const router = useRouter();

    // If no session, redirect to login page
    if (!session) {
        router.push('/auth/signin');
        return null;
    }

    
    // If session, show children components 
    if (session) {

        return <>
            { children }
        </>
    }

    return <>
    
    
    </>

}