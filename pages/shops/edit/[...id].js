import Shop from "@/components/Shop";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FcSurvey } from "react-icons/fc";
import Head from "next/head";



export default function Editshops() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get('/api/shops?id=' + id).then(response => {
                setProductInfo(response.data)
            })
        }
    }, [id])



    return <>
        <Head>
            <title>Update Product</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h1>ADMIN PANEL</h1>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Edit Product</span>
                </div>
            </div>
            <div className="mt-3">
                {productInfo && (
                    <Shop {...productInfo} />
                )}
            </div>
        </div>
    </>
}