import Blog from "@/components/Blog";
import { FcSurvey } from "react-icons/fc";


export default function Addblog() {



    return <>
        <div className="addblogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Blog</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Add Blog</span>
                </div>
            </div>
            <div className="blogsadd">
                <Blog />
            </div>
        </div>
    </>
}