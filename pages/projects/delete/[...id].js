import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcSurvey } from "react-icons/fc";
import { useRouter } from "next/router";

export default function DeleteProduct() {

    const router = useRouter();
    const { id } = router.query;
    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        } else {
            axios.get("/api/projects?id=" + id).then((response) => {
                setProductInfo(response.data);
            });
        }
    }, [id]);

    function goBack() {
        router.push("/projects");
    }

    async function deleteBlog() {
        await axios.delete("/api/projects?id=" + id);
        toast.success("deleted successfully");
        goBack();
    }


    return <>
        <Head>
            <title>Delete Project</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        Edit <span>{productInfo?.title}</span>
                    </h2>
                    <h1>ADMIN PANEL</h1>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Delete Project</span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh-100">
                <div className="deletecard">
                    <svg
                        viewBox="0 0 24 24"
                        fill="red"
                        height="6em"
                        width="6em"
                    >
                        <path d="M 35.216 78.235 c -2.209 0 -4 -1.791 -4 -4 V 44.976 c 0 -2.209 1.791 -4 4 -4 s 4 1.791 4 4 v 29.259 C 39.216 76.444 37.425 78.235 35.216 78.235 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    </svg>
                    <p className="cookieHeading">Are you sure?</p>
                    <p className="cookieDescription">
                        If you delete this website content it will be permanent delete your content
                    </p>
                    <div className="buttonContainer">
                        <button
                            className="acceptButton"
                            onClick={deleteBlog}
                        >
                            Delete
                        </button>
                        <button
                            className="declineButton"
                            onClick={goBack}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}