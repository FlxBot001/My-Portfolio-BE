import { useSession } from "next-auth/react"
import { useRouter } from "next/router";



export default function LoginLayout({ children }) {

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div className="full-h flex flex-center">
            <div className="loading-bar">Loading</div>
        </div>
    }

    const router = useRouter();

    if (!session) {
        router.push('/auth/signup');
        return null;
    }

    if (session) {

        return <>
            { children }
        </>
    }

    return <>
    
    
    </>

}