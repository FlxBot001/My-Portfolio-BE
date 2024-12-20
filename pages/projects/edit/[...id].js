import Project from "@/components/Project";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FcSurvey } from "react-icons/fc";


export default function EditProject() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/projects?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])


    return <>
        <Head>
            <title>Update Project</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h1>ADMIN PANEL</h1>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Edit Project</span>
                </div>
            </div>
            <div className="mt-3">
                {productInfo && (
                    <Project {...productInfo} />
                )}
            </div>
        </div>
    </>
}