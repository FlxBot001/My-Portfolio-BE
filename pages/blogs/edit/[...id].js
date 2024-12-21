import Blog from "@/components/Blog";
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import LoginLayout from "@/components/LoginLayout";
import { FcSurvey } from "react-icons/fc";

export default function EditProduct() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/blogs?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])

    return <>
        <Head>
            <title>Update Blog</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h1>ADMIN PANEL</h1>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Edit Blog</span>
                </div>
            </div>
            <div className="mt-3">
                {productInfo && (
                    <Blog {...productInfo} />
                )}
            </div>
        </div>
    </>
}